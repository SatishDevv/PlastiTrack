import { CatchAsyncError } from "../middleware/catchAsyncError.js";
import containerModel from "../models/container.model.js";
import ErrorHandler from "../utils/ErrorHandler.js";
import containerAssignmentModel from "../models/containerAssignment.model.js";
import moment from "moment";
import transactionalModel from "../models/containerTransaction.model.js";

export const cardData = CatchAsyncError(async (req, res, next) => {
  try {
    let totalContainer = 0;
    let totalOutWord = 0;
    let totalInWord = 0;
    let totalInStock = 0;
    const totalContainerData = await containerModel.find();
    totalContainerData.map((x) => {
      totalContainer += x.inStock;
      totalInWord += x.Inward;
      totalOutWord += x.Outward;
      totalInStock += x.remainingStock;
    });

    const completedTransactions = await transactionalModel.countDocuments({
      status: { $regex: "^completed$", $options: "i" },
    });

    const activeTransactions = await transactionalModel.countDocuments({
      status: { $regex: "^pending$", $options: "i" },
    });

    res
      .status(201)
      .json({
        totalContainer,
        totalOutWord,
        totalInWord,
        totalInStock,
        completedTransactions,
        activeTransactions,
      });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

/*
 * @desc     Get record for consumer (created by admin)
 * @route    /api/v1/dashboard/all
 */

export const getConsumerReport = CatchAsyncError(async (req, res) => {
  try {
    const basePipeline = (start, end) => [
      {
        $match: {
          createdAt: { $gte: start.toDate(), $lte: end.toDate() },
          consumerId: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdById",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $match: {
          "creator.roleName": "admin",
        },
      },
    ];

    // Weekly report
    const getWeeklyTrend = async () => {
      const today = moment().endOf("day");
      const lastWeek = moment().subtract(6, "days").startOf("day");

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(lastWeek, today),
        {
          $group: {
            _id: { $dayOfWeek: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const dayMap = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      const fullWeek = Array.from({ length: 7 }, (_, i) => {
        const day = moment().startOf("week").add(i, "days");
        return {
          label: dayMap[day.day()],
          containerCount: 0,
        };
      });

      result.forEach((r) => {
        const dayName = dayMap[r._id - 1];
        const match = fullWeek.find((d) => d.label === dayName);
        if (match) match.containerCount = r.containerCount;
      });

      return fullWeek;
    };

    // Monthly report
    const getMonthlyTrend = async () => {
      const start = moment().startOf("month");
      const end = moment().endOf("month");

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(start, end),
        {
          $group: {
            _id: { $dayOfMonth: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const daysInMonth = start.daysInMonth();
      const fullMonth = Array.from({ length: daysInMonth }, (_, i) => ({
        label: `Day ${i + 1}`,
        containerCount: 0,
      }));

      result.forEach((r) => {
        fullMonth[r._id - 1].containerCount = r.containerCount;
      });

      return fullMonth;
    };

    // Yearly report
    const getYearlyTrend = async () => {
      const start = moment().startOf("year");
      const end = moment().endOf("year");

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(start, end),
        {
          $group: {
            _id: { $month: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const monthMap = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const fullYear = monthMap.map((label, idx) => ({
        label,
        containerCount: 0,
      }));

      result.forEach((r) => {
        fullYear[r._id - 1].containerCount = r.containerCount;
      });

      return fullYear;
    };

    // Run all 3 reports
    const [weekly, monthly, yearly] = await Promise.all([
      getWeeklyTrend(),
      getMonthlyTrend(),
      getYearlyTrend(),
    ]);

    res.status(200).json({
      weekly,
      monthly,
      yearly,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getVendorReport = CatchAsyncError(async (req, res, next) => {
  try {
    // Base aggregation pipeline for vendor assignments created by consumers
    const basePipeline = (start, end) => [
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          vendorId: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdById",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $match: {
          "creator.roleName": "consumer",
        },
      },
    ];

    // WEEKLY TREND
    const getWeeklyTrend = async () => {
      const now = new Date();

      // Find the most recent Monday
      const dayOfWeek = now.getUTCDay(); // Sunday = 0, Monday = 1, ..., Saturday = 6
      const distanceToMonday = (dayOfWeek + 6) % 7; // How many days to subtract to reach Monday

      const monday = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - distanceToMonday
        )
      );
      const sunday = new Date(
        Date.UTC(
          monday.getUTCFullYear(),
          monday.getUTCMonth(),
          monday.getUTCDate() + 6,
          23,
          59,
          59,
          999
        )
      );

      const result = await containerAssignmentModel.aggregate([
        {
          $match: {
            createdAt: { $gte: monday, $lte: sunday },
            vendorId: { $ne: null },
          },
        },
        {
          $lookup: {
            from: "users",
            localField: "createdById",
            foreignField: "_id",
            as: "creator",
          },
        },
        { $unwind: "$creator" },
        {
          $match: {
            "creator.roleName": "consumer",
          },
        },
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            containerCount: { $sum: "$quantity" },
          },
        },
      ]);

      const dateMap = {};
      result.forEach((r) => {
        dateMap[r._id] = r.containerCount;
      });

      const fullWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setUTCDate(monday.getUTCDate() + i);
        const isoDate = date.toISOString().split("T")[0];
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

        return {
          label: weekday,
          containerCount: dateMap[isoDate] || 0,
        };
      });

      return fullWeek;
    };

    // MONTHLY TREND
    const getMonthlyTrend = async () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      const daysInMonth = end.getDate();

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(start, end),
        {
          $group: {
            _id: { $dayOfMonth: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const fullMonth = Array.from({ length: daysInMonth }, (_, i) => ({
        label: `Day ${i + 1}`,
        containerCount: 0,
      }));

      result.forEach((r) => {
        if (fullMonth[r._id - 1]) {
          fullMonth[r._id - 1].containerCount = r.containerCount;
        }
      });

      return fullMonth;
    };

    // YEARLY TREND
    const getYearlyTrend = async () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(start, end),
        {
          $group: {
            _id: { $month: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const monthMap = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const fullYear = monthMap.map((label, i) => ({
        label,
        containerCount: 0,
      }));

      result.forEach((r) => {
        fullYear[r._id - 1].containerCount = r.containerCount;
      });

      return fullYear;
    };

    // Execute all 3 trend generators
    const [weekly, monthly, yearly] = await Promise.all([
      getWeeklyTrend(),
      getMonthlyTrend(),
      getYearlyTrend(),
    ]);

    // Send response
    res.status(200).json({
      weekly,
      monthly,
      yearly,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});

export const getCustomerReport = CatchAsyncError(async (req, res, next) => {
  try {
    const basePipeline = (start, end) => [
      {
        $match: {
          createdAt: { $gte: start, $lte: end },
          customerId: { $ne: null },
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "createdById",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $match: {
          "creator.roleName": "vendor",
        },
      },
    ];

    // WEEKLY TREND
    const getWeeklyTrend = async () => {
      const now = new Date();
      const dayOfWeek = now.getUTCDay(); // Sunday = 0
      const distanceToMonday = (dayOfWeek + 6) % 7;

      const monday = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() - distanceToMonday
        )
      );
      const sunday = new Date(
        Date.UTC(
          monday.getUTCFullYear(),
          monday.getUTCMonth(),
          monday.getUTCDate() + 6,
          23,
          59,
          59,
          999
        )
      );

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(monday, sunday),
        {
          $group: {
            _id: {
              $dateToString: { format: "%Y-%m-%d", date: "$createdAt" },
            },
            containerCount: { $sum: "$quantity" },
          },
        },
      ]);

      const dateMap = {};
      result.forEach((r) => {
        dateMap[r._id] = r.containerCount;
      });

      const fullWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(monday);
        date.setUTCDate(monday.getUTCDate() + i);
        const isoDate = date.toISOString().split("T")[0];
        const weekday = date.toLocaleDateString("en-US", { weekday: "short" });

        return {
          label: weekday,
          containerCount: dateMap[isoDate] || 0,
        };
      });

      return fullWeek;
    };

    // MONTHLY TREND
    const getMonthlyTrend = async () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
        23,
        59,
        59,
        999
      );
      const daysInMonth = end.getDate();

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(start, end),
        {
          $group: {
            _id: { $dayOfMonth: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const fullMonth = Array.from({ length: daysInMonth }, (_, i) => ({
        label: `Day ${i + 1}`,
        containerCount: 0,
      }));

      result.forEach((r) => {
        if (fullMonth[r._id - 1]) {
          fullMonth[r._id - 1].containerCount = r.containerCount;
        }
      });

      return fullMonth;
    };

    // YEARLY TREND
    const getYearlyTrend = async () => {
      const now = new Date();
      const start = new Date(now.getFullYear(), 0, 1);
      const end = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999);

      const result = await containerAssignmentModel.aggregate([
        ...basePipeline(start, end),
        {
          $group: {
            _id: { $month: "$createdAt" },
            containerCount: { $sum: "$quantity" },
          },
        },
        { $sort: { _id: 1 } },
      ]);

      const monthMap = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const fullYear = monthMap.map((label) => ({
        label,
        containerCount: 0,
      }));

      result.forEach((r) => {
        fullYear[r._id - 1].containerCount = r.containerCount;
      });

      return fullYear;
    };

    const [weekly, monthly, yearly] = await Promise.all([
      getWeeklyTrend(),
      getMonthlyTrend(),
      getYearlyTrend(),
    ]);

    res.status(200).json({
      weekly,
      monthly,
      yearly,
    });
  } catch (error) {
    return next(new ErrorHandler("Internal Server Error", 500));
  }
});
