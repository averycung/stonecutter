const Quote = () => {
  return (
    <div className="absolute left-2 -top-16 ">
      <div className="border-4 border-stone-700  bg-white 
        dark:bg-stone-200 shadow-2xl p-4 max-w-96 mx-5 transition-all ease-linear duration-500">
          <div className='border dark:border-stone-300'>
            <span className="block text-left text-sm font-dmserif p-2 text-black">
                “ When nothing seems to help, I go and look at a stonecutter
                hammering away at his rock, perhaps a hundred times without as
                much as a crack showing in it. Yet at the hundred and first
                blow it will split in two, and I know it was not that last
                blow that did it, but all that had gone before.”
            </span>
            <span className="block font-dmserif text-black pb-2 text-xs pr-2 text-right">Jacob Riis</span>
          </div>
        </div>
      </div>
  )
}

export default Quote