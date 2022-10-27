import { Link } from "react-router-dom";

const ChangePasswordPage = () => {
  return (
    <>
      <div className="go-back">
        <Link to={-1}>go back</Link>
      </div>
      <div className="form">
        <form className="form-container">
          <ul>
            <li>
              <h3>Change Password</h3>
            </li>
            <li>
              <input
                id="Current Password"
                type="password"
                name="Current Password"
                placeholder="Current Password"
              />
            </li>
            <li>
              <input
                id="New Password"
                type="password"
                name="New Password"
                placeholder="New Password"
              />
            </li>
            <li>
              <input
                id="Confirm New Password"
                type="password"
                name="Confirm New Password"
                placeholder="Confirm New Password"
              />
            </li>
            <li>
              <button type="submit" className="button">
                submit
              </button>
            </li>
            <li></li>
          </ul>
        </form>
      </div>
    </>
  );
};

export default ChangePasswordPage;
