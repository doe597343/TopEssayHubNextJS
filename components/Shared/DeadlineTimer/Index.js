

import Countdown from "react-countdown";


const renderer = ({days, hours, minutes, seconds, completed }) => {
//   if (completed) {
    // Render a completed state
    // return <Completionist />;
//   } else {
    // Render a countdown
    return <div className=" font-bold flex space-x-3">
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{days} </p>
                    <p>Days</p>
                </div>
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{hours} </p>
                    <p>Hours</p>
                </div>
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{minutes} </p>
                    <p>Mins</p>
                </div>
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{seconds} </p>
                    <p>Sec</p>
                </div>

            </div>
//  <span className=" font-semibold text-2xl text-green-600">
//             {days} Days: {hours} hrs :{minutes} min :{seconds} sec
//         </span>;
//   }
};

export default function Index(props){
    let params = null
    if(props.duration == "days") {
        params = {
            days: props.deadline,
            hours: 0,
            minutes: 0,
            seconds: 0,
            completed: false
        }
    }else{
        params = {
            days: 0,
            hours: props.deadline,
            minutes: 0,
            seconds: 0,
            completed: false
        }
    }
    return  <div>
        {props.status == "Paid" ? <Countdown date={ Date.parse(props.final_deadline)} renderer={renderer} overtime={true}/> : 
        //    <renderer days={params.days} hours={params.hours} minutes={params.minutes} seconds={params.seconds} completed={false} />
            <div className=" font-bold flex space-x-3">
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{params.days} </p>
                    <p>Days</p>
                </div>
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{params.hours} </p>
                    <p>Hours</p>
                </div>
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{params.minutes} </p>
                    <p>Mins</p>
                </div>
                <div className=" shadow-md text-center p-2 bg-yellow-50 text-gray-600">
                    <p>{params.seconds} </p>
                    <p>Sec</p>
                </div>

            </div>
          }
    </div>
}


const Completionist = () => <span>You are good to go!</span>;