import {Link} from "react-router-dom";

export default function Developer({_id,username, email, age, contact, about, github, linkedin, password}) {

  return (
    <div className="post">
      <div className="texts">
        <Link to={`/developers/${_id}`}>
        <h2>{username}</h2>
        </Link>
        <p className="summary">{about}</p>
      </div>
    </div>
  );
}