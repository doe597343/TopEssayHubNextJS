import { useState } from "react"
// import react from react
import Email from './Email'
import Otp from './Otp'

export default function Index() {
    const [step, set_step] = useState(1)
    const [email, set_email] = useState("")

    return <div>
        {step == 1 && <Email set_email={set_email} email={email} set_step={set_step} />}
        {step == 2 && <Otp set_step={set_step} email={email} />}
    </div>
}