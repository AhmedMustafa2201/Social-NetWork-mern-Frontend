import React from 'react'
import { useDispatch,connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../redux/actions/userActions';

function LogIn({userError,userSuccess}) {
    const [error, setError] = React.useState(null);
    const [success, setSuccess] = React.useState(false);
    const [user, setUser] = React.useState({
        email:"",
        password:""
    });

    React.useEffect(() => {
      if(userError && userError !== null){
        setError(userError);
      }
      if(userSuccess){
        setSuccess(userSuccess);
        dispatch({type:"TOGGLE_SUCCESS"});
      }
    }, [userError,userSuccess])

    const showError =()=>{
    return error && <div className="alert alert-danger">{error}</div>
    }

    const redirectUser=()=>{
      return success && <Redirect to="/" />
    }

    const dispatch = useDispatch()
    const handleInputChange = (e) =>{
        setUser({...user,[e.target.name]:e.target.value});
    }
    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(login(user));
    }
    return (
      
      <form onSubmit={handleFormSubmit}>
        {showError()}
        {redirectUser()}
  <div className="form-group">
    <input type="email" name="email" placeholder="Email" onChange={(e)=>handleInputChange(e)} value={user.email} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
  </div>
  <div className="form-group">
    <input type="password" name="password" placeholder="Password" onChange={(e)=>handleInputChange(e)} value={user.password} className="form-control" />
  </div>
  <button type="submit" className="btn btn-primary">Log In</button>
 </form> 
    )
}
const mapStateToProps = ({user : {userError, userSuccess}})=>({
  userError,
  userSuccess
})
export default connect(mapStateToProps,null)(LogIn)
