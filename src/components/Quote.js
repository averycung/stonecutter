const Quote = () => {
  return (
    <div className="w-full flex justify-center md:justify-normal mt-2 mb-4 px-6">
      <div className="
        border-4 border-stone-700 bg-white 
        dark:bg-stone-800 dark:border-4 dark:border-stone-600 shadow-xl
        p-3 md:p-4 max-w-xs md:max-w-md mx-2
        transition-all ease-linear duration-500
      ">
        <div className='border dark:border-stone-600'>
          <span className="
            block text-left text-xs md:text-sm font-dmserif p-2
            text-black dark:text-stone-300
          ">
            “ When nothing seems to help, I go and look at a stonecutter
            hammering away at his rock, perhaps a hundred times without as
            much as a crack showing in it. Yet at the hundred and first
            blow it will split in two, and I know it was not that last
            blow that did it, but all that had gone before.”
          </span>
          <span className="
            block font-dmserif text-black dark:text-stone-300 pb-2
            text-xs pr-2 text-right
          ">
            Jacob Riis
          </span>
        </div>
      </div>
    </div>
  )
}

export default Quote