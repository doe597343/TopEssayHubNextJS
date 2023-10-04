import react, { useEffect, useState } from "react";



export default function Index(props) {

  const [selectedPaper, setSelectedPaper] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedFormat, setSelectedFormat] = useState(null)
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [selectedWriterCat, setSelectedWriterCat] = useState(null)
  
  useEffect(() => {
    let paper = getSelectedListOption('PAPER');
    console.log('paper == ', paper)
    setSelectedPaper(paper)

    let subject = getSelectedListOption('SUBJECT');
    setSelectedSubject(subject)

    let level = getSelectedListOption('ACADLEVEL');
    setSelectedLevel(level)

    let format = getSelectedListOption('FORMAT');
    setSelectedFormat(format)

    let writer_cat = getSelectedListOption('WRITER-CATEGORY');
    setSelectedWriterCat(writer_cat)
  }, [props.orderJSON])

    const getSelectedListOption = (listType) => {
      let item = null
      switch(listType){
        case "PAPER":
          item = props.paperTypes.filter(item => item.id == props.orderJSON.paper_id)
          break;
        case "SUBJECT":
          item = props.subjectTypes.filter(item => item.id == props.orderJSON.subject_id)
          break;
        case "FORMAT":
          item = props.paperFormats.filter(item => item.id == props.orderJSON.format_id)
          break;
        case "ACADLEVEL":
          item = props.academicLevels.filter(item => item.id == props.orderJSON.academic_level_id)
          break;
        case "WRITER-CATEGORY":
          item = props.writerCategories.filter(item => item.id == props.orderJSON.writer_category_id)
          break;
      }
     
      return item[0]
    }

    const apply_coupon_code = () => {
        let orderJSON = props.orderJSON
        props.setOrder(orderJSON)
    }

  // hidden md:inline-block bg-white shadow-lg py-6 px-8 rounded-lg w-[26rem]
    return <div class="hidden md:block bg-white rounded-lg shadow-lg p-5">
    <div class=" font-bold text-lg mb-4">Writer's Choice</div>
    <div class="flex  mb-6">
      <div class=" space-y-1 w-52">
        <p class=" font-light ">Type of Service</p>
        <p class="  font-semibold">Writing</p>

      </div>
      <div class=" space-y-1">
        <p class="font-light">Writer Level</p>
        <p class="  font-semibold w-36">{selectedWriterCat && selectedWriterCat.writer_category}</p>
      </div>
    </div>

    <div class="flex pb-6">
      <div class=" space-y-1 w-52">
        <p class=" font-light ">Type of Paper</p>
        <p class="  font-semibold w-36">{selectedPaper && selectedPaper.category_name}</p>
        {/* {props.paperTypes.map(item => {
          if(item.id == props.orderJSON.paper_id){
            return <p className="font-semibold">{selectedPaper.category_name}</p>
          }
        })} */}
      </div>
      <div class=" space-y-1">
        <p class="font-light">Subject</p>
        <p class="  font-semibold w-36">{selectedSubject && selectedSubject.category_name}</p>
      </div>
    </div>

    <div class="flex pb-6">
      <div class=" space-y-1 w-52">
        <p class=" font-light ">Academic Level</p>
        <p class="  font-semibold w-36">{selectedLevel && selectedLevel.academic_name}</p>
      </div>
      <div class=" space-y-1">
        <p class="font-light">Paper format</p>
        <p class="  font-semibold w-36">{selectedFormat && selectedFormat.format_name}</p>
      </div>
    </div>

    {/* 1 Page(s) x USD 8.95
USD 8.95 */}

    {/* <div class="flex justify-between font-bold px-3 pb-4">
      <p> {props.orderJSON.pages} Page(s) x USD {props.orderJSON.cost_per_page}  </p>
      <p class="text-green-600">${props.orderJSON.page_total_cost}</p>
    </div> */}

    {props.orderJSON.page_total_cost != 0 && 
    <div class="flex pb-2 font-semibold">
      <div class=" space-y-1 w-52">
        <p> {props.orderJSON.pages} Page(s) x USD {props.orderJSON.cost_per_page.toFixed(2)}  </p>
      </div>
      <div class=" space-y-1">
        <p class="text-green-600">${props.orderJSON.page_total_cost.toFixed(2)}</p>
      </div>
    </div>}

    {props.orderJSON.slide_total_cost != 0 && 
    <div class="flex pb-2 font-semibold">
      <div class=" space-y-1 w-52">
        <p> {props.orderJSON.slides} Slide(s) x USD {props.orderJSON.cost_per_slide.toFixed(2)}  </p>
      </div>
      <div class=" space-y-1">
        <p class="text-green-600">${props.orderJSON.slide_total_cost.toFixed(2)}</p>
      </div>
    </div>}

    {(props.orderJSON.referral_discount + props.orderJSON.coupon_discount) != 0 &&    
    <div class="flex pb-6 font-semibold">
      <div class=" space-y-1 w-52">
        <p> Discounted Price  </p>
      </div>
      <div class=" space-y-1">
        <p class="text-red-600">-${(props.orderJSON.referral_discount + props.orderJSON.coupon_discount).toFixed(2)}</p>
      </div>
    </div>}


    <div class="space-y-4 mt-9">
      <div class="flex">
        <input type="text" value={props.orderJSON.coupon_code} onChange={(e) => props.update_detail(e)} name="coupon_code" placeholder="Enter promo code" class="p-1.5 bg-gray-50 border flex-1"/>
        <input type="button" value="Apply" onClick={()=> apply_coupon_code()} class=" bg-yellow-400 px-3 text-sm font-light"/>
      </div>

      {!props.orderJSON.coupon_status && props.orderJSON.coupon_message && <small className=" text-red-400 py-1">{props.orderJSON.coupon_message}</small>}

      {props.orderJSON.coupon_status && props.orderJSON.coupon_message && <small className=" text-green-600 py-1">{props.orderJSON.coupon_message}</small>}

    {/* "cost_per_page": 10,
    "cost_per_slide": 5,
    "page_total_cost": 10,
    "slide_total_cost": 0 */}

      <div class="flex justify-between font-bold text-2xl px-3 pb-4">
        <p> Total Price:  </p>
        <p class="text-green-600">${props.orderJSON.total_price.toFixed(2)}</p>
      </div>

      <button onClick={() => props.handleSteps(true)} type="button" class="bg-yellow-400 w-full p-3 rounded-md shadow-md font-semibold block">Continue</button>
      {props.formStep > 1 && 
      <button onClick={() => props.handleSteps(false)} type="button" class="bg-yellow-400 w-full p-3 rounded-md shadow-md font-semibold block">Go Back</button> }

    </div>

  </div>

}