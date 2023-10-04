import Link from "next/link";

export default function Index() {
    return <div className=" text-gray-700">
      <div class="pt-[9rem] md:flex text-gray-800 justify-between items-center px-20">
        <div class="flex-1">
          <h1 class=" font-bold text-5xl">
            Get your order in just 3 simple steps
          </h1>
          <p class="py-5 text-xl">
            Are you in search of top-quality academic essay writing services that can meet your deadlines? Don't worry, as we've got you covered. CheapestEssay can provide you with an exceptional educational experience and unique academic solutions. Keep reading to learn how effortless and convenient it is to place an order for academic papers and receive a flawless assignment with minimal effort.
          </p>
          <div>
            {/* <input  type="button" value="Order now"/> */}
            <Link class="mt-3 py-3 px-14 font-semibold bg-yellow-400 rounded-md shadow-lg" href="/order">Order now</Link>
          </div>
        </div>
        <div class="flex-1">
          <img class=" ml-auto" src="./hero-img.svg" />
        </div>
      </div>

      {/* Step 1 */}
      <div className="px-20 mt-20">
        <div className="flex my-10 space-x-10">
          <p className=" text-yellow-500  font-semibold text-3xl">
            Step 1
          </p>
          <div>
            <h2 className=" font-semibold text-2xl">
              From start to finish: Navigating the essay order form
            </h2>
            <p>
              It's crucial to us that we meet your requirements when writing your essay. It can make or break your grade.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="">
            <img className=" mx-auto w-3/4" src="./step1.png" />
          </div>
          <div className="">
            <p className="pt-10">
              It is strongly advised to give a comprehensive amount of information when requesting an essay paper. This includes sharing appropriate sources and providing examples of your writing style.
            </p>
           <p className="pt-10">
              To benefit from our double deadline feature and ensure that your essay is delivered on time, it is recommended to place your order early and inquire about the expected completion date. This will also allow you to save money.
            </p>
          </div>
        </div>
      </div>

      {/* Step 2 */}
      <div className="px-20">
        <div className="flex my-10 space-x-10">
          <p className=" text-yellow-500  font-semibold text-3xl">
            Step 2
          </p>
          <div>
            <h2 className=" font-semibold text-2xl">
              Finalize the payment.
            </h2>
            <p>
              It's crucial to us that we meet your requirements when writing your essay. It can make or break your grade.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="order-2">
            <img className=" shadow-lg mx-auto w-3/4" src="./step2.png" />
          </div>
          <div className=" order-1">
            <p className="pt-10">
              After submitting your request, proceed to make a payment for your order using either Credit Card, Googlepay, or Applepay. 
            </p>
           <p className="pt-10">
              Rest assured that you need not be concerned about your funds, as if you are unsatisfied with the outcome, you may request revisions or modifications to the document until you receive a satisfactory result.
            </p>
          </div>
        </div>
      </div>


      {/* Step 2 */}
      <div className="px-20">
        <div className="flex my-10 space-x-10">
          <p className=" text-yellow-500  font-semibold text-3xl">
            Step 3
          </p>
          <div>
            <h2 className=" font-semibold text-2xl">
              Track the progress of the order.
            </h2>
            <p>
              It's crucial to us that we meet your requirements when writing your essay. It can make or break your grade.
            </p>
          </div>
        </div>
        <div className="flex">
          <div className="">
            <img className=" shadow-lg mx-auto w-3/4" src="./step3.png" />
          </div>
          <div className="">
            <p className="pt-10">
              Take advantage of the chance to monitor the progress of your order. When we receive your order, we will assign it to a writer with the appropriate expertise for the job. 
            </p>
           <p className="pt-10">
              If you notice that your order is not progressing as you anticipated or have any other concerns, please don't hesitate to contact our team.
            </p>
          </div>
        </div>
      </div>
    </div>



}