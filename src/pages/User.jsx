import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import users from "../assets/js/users";
import dummyImage from "../assets/images/user.jpg";
import Navigation from "../components/Navigation";

const User = () => {
    const [userImg, setUserImg] = useState("");
    const {userId} = useParams();
    const navigate = useNavigate();
    const page = "users";
    //fetchng user info
    const userInfo = users.find(user => {
        return user.id === userId;
    });
    const {name, image, username, email} = userInfo;
    const [formData, setFormData] = useState({userName: name, userEmail: email});
    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }
    const updateUserInfo = (e) => {
        e.preventDefault();
        navigate('/users');
    }
    
    
    return (
        <section className="user-section">
            <div className="heading navigate">
                <h2>user profile</h2>
                <Navigation parentPage={page} />
            </div>
            <div className="user-info">
                <img src={require(`../assets/images/users/${image}`)} alt="user" />
                <div className="user-details">
                    <h2>{name}</h2>
                    <p><strong>Email:</strong> <span>{email}</span></p>
                    <p><strong>Phone:</strong> <span>+234 8137989322</span></p>
                    <p><strong>Username:</strong> <span>@{username}</span></p>
                    
                </div>
            </div>
            <div className="user-update-form-container">
                <img src={userImg ? URL.createObjectURL(userImg) : dummyImage} alt="user" />
                <form className="user-update-form" onSubmit={updateUserInfo}>
                    <div className="user-input">
                        <label className="image-label" htmlFor="userImage">upload user image <i className="fas fa-upload"></i></label>
                        <input id="userImage" type="file" onChange={(e) => setUserImg(e.target.files[0])} style={{display: "none"}} />
                    </div>
                    <div className="user-input">
                        <label>name</label>
                        <input type="text" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Enter Name" />
                    </div>
                    <div className="user-input">
                        <label>email</label>
                        <input type="email" name="userEmail" value={formData.userEmail} onChange={handleInputChange} placeholder="Enter Email" />
                    </div>
                    <button className="submit-btn">update</button>
                </form>
            </div>
        </section>
    )
}

export default User;