import Link from "next/link";

export default function Index(props) {
  // console.log('Header props == ', props)
    return <div class="pt-[9rem] pb-8 md:flex text-gray-800 justify-between items-center px-6 md:px-20 text-gray-700">
        <div class="flex-1">
          <h1 class=" font-bold text-3xl md:text-5xl">
            {/* Get your order in just 3 simple steps */}
            {props.data.content.header}
          </h1>
          <p class="py-5 text-xl">
            {/* Are you in search of top-quality academic essay writing services that can meet your deadlines? Don't worry, as we've got you covered. CheapestEssay can provide you with an exceptional educational experience and unique academic solutions. Keep reading to learn how effortless and convenient it is to place an order for academic papers and receive a flawless assignment with minimal effort. */}
            {props.data.content.content}
          </p>
          <div>
            <Link href="/order" class=" md:mx-auto mt-3 py-3 px-14 font-semibold bg-yellow-400 rounded-md shadow-lg">Order now</Link>
          </div>
        </div>
        <div class="flex-1">
          <img class="hidden md:block ml-auto" src="/services-hero.svg" />
        </div>
      </div>
}