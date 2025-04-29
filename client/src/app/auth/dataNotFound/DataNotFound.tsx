import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

const DataNotFound = () => {
  return (
    <div className="sm-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-8xl mx-auto text-center flex flex-col items-center"
      >
        <img
          src="/Setting.svg"
          alt="No Data Found"
          className="w-54 h-auto mb-8 drop-shadow-xl"
        />

        <h2 className="text-3xl md:text-4xl font-extrabold ">
          No Data Found
        </h2>

        <p className=" mt-3 max-w-md text-base md:text-lg mr-26">
          Looks like there's nothing here yet. Try adjusting your filters or check back later.
        </p>

        <Button
          onClick={() => window.location.reload()}
          className="mt-6 px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 transition duration-300 font-semibold shadow-md"
        >
          Refresh Page
        </Button>
      </motion.div>
    </div>
  )
}

export default DataNotFound
