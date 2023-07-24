export const Login: React.FC<{}> = () => {
    return (
        <div className="account-page">
            <h1 className="page-title" id="login-title">Log In</h1>

            <form name="login-form" className="account-form">

                <p className="account-label account-email-label">Email</p>
                <input className="account-field account-email" type="email" placeholder="name@example.com"></input>

                <p className="account-label account-password-label">Password</p>
                <input className="account-field account-password" type="password" placeholder="bestpasswordever"></input>

                <p className="account-label account-confirm-password-label">Confirm Password</p>
                <input className="account-field account-confirm-password" type="password" placeholder="bestpasswordever"></input>

                <input style={{margin: "5vh"}} className="account-field account-submit" type="submit" value="Submit Login"></input>

            </form>
        </div>
    );
}