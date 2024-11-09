'use client'
import styles from "./auth.module.scss";
import {useActionState, useRef, useState} from "react";
import {useFormStatus} from "react-dom";
import {handleCheckEmail, handleLogin, handleRegister} from "@/app/auth/actions";

function EmailForm({setStep, setEmail, email}) {
    const [actionState, action] = useActionState(async (state, formData) => {
        return await handleCheckEmail(state, formData, setStep, setEmail)
    }, {})
    const {errors} = actionState;
    const formRef = useRef(null);

    return (
        <>
            <div className={styles.heading}>Enter your email</div>
            <form ref={formRef} action={action}>
                <div className={styles.inputs}>
                    <input
                        id="email"
                        defaultValue={email}
                        name="email"
                        type="email"
                        placeholder="Enter your email"
                    />
                    <p className={styles.error}>{errors ? errors.email || errors.request : ""}&nbsp;</p>
                </div>
                <div className={styles.actions}>
                    <SubmitButton formRef={formRef} text={"Continue"}/>
                </div>
            </form>
        </>
    );
}

function RegisterForm({setStep, email}) {
    const formRef = useRef(null);
    const [actionState, action] = useActionState(handleRegister, {})
    const {errors} = actionState;

    return (
        <>
            <div className={styles.heading}>Registering a new account for<br/> {email}</div>
            <form ref={formRef} action={action}>
                <div className={styles.inputs}>
                    <input type="hidden" name="email" defaultValue={email}/>
                    <input id="password" name="password" type="password" placeholder="Enter password"/>
                    <p className={styles.error}>{errors ? errors.password || errors.request : ""}&nbsp;</p>

                </div>
                <div className={styles.actions}>
                    <SubmitButton formRef={formRef} text={"Register"}/>
                    <button onClick={() => {
                        setStep("email")
                    }} className="outline full">Back
                    </button>
                </div>
            </form>
        </>
    );

}

function LoginForm({setStep, email}) {
    const formRef = useRef(null);
    const [actionState, action] = useActionState(handleLogin, {})
    const {errors} = actionState;

    return (
        <>
            <div className={styles.heading}>Logging in as <br/> {email}</div>
            <form ref={formRef} action={action}>
                <div className={styles.inputs}>
                    <input type="hidden" name="email" defaultValue={email}/>
                    <input id="password" name="password" type="password" placeholder="Enter password"/>
                    <p className={styles.error}>{errors ? errors.password || errors.request : ""}&nbsp;</p>
                </div>
                <div className={styles.actions}>
                    <SubmitButton formRef={formRef} text={"Login"}/>
                    <button onClick={() => {
                        setStep("email")
                    }} className="outline full">Back
                    </button>
                </div>
            </form>

        </>
    );
}

function SubmitButton({formRef, text}) {
    const {pending} = useFormStatus()
    return (
        <button className="primary full" disabled={pending} type="submit">
            {pending ? "Loading..." : text}
        </button>
    )
}

export default function Auth() {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState("email");

    if (step === 'email') {
        return <EmailForm setStep={setStep} email={email} setEmail={setEmail}/>;
    }
    if (step === 'register') {
        return <RegisterForm setStep={setStep} email={email}/>;
    }
    if (step === 'login') {
        return <LoginForm setStep={setStep} email={email}/>;
    }
}
