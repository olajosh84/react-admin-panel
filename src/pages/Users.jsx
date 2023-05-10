import { useState } from "react";
import { Link } from "react-router-dom";
import users from "../assets/js/users";
import dummyImage from "../assets/images/dummy.jpeg";
import randomId from "../assets/js/randomid";

const Users = () => {
    const [usersData, setUsersData] = useState(users);
    const [formData, setFormData] = useState({name: "", email: "", username: "", password: ""});
    const[userImage, setUserImage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [searchItem, setSearchItem] = useState("");
    const [searchBtn, setSearchBtn] = useState({searchIcon: true, resetIcon: false});
    
    const filteredUsers = usersData.filter((user) => {
        const { name, email, username } = user;
        return  name.toLowerCase().includes(searchItem.toLowerCase()) ||
                email.toLowerCase().includes(searchItem.toLowerCase()) ||
                username.toLowerCase().includes(searchItem.toLowerCase())
    })

    const handleInputChange = (e) => {
        let value = e.target.value;
        if(value){
            setSearchBtn(prevState => {
                return {
                    searchIcon: false,
                    resetIcon: true
                }
            })
        }else{
            setSearchBtn(prevState => {
                return {
                    searchIcon: true,
                    resetIcon: false
                }
            })
        }
        setSearchItem(value);

    }

    const clearSearchForm = (e) => {
        e.preventDefault();
        setSearchItem("");
        setSearchBtn(prevState => {
            return {
                searchIcon: true,
                resetIcon: false
            }
        })
    }
    const closeModal = () => {
        setUserImage(false)
        setShowModal(false);
        setFormData({name: "", email: "", username: "", password: ""});
    }
    const userInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        closeModal();
        const newUser = {id: randomId(), name: formData.name, email: formData.email, username: formData.username,view: false};
        setUsersData(prevUsersData => {
            return [
                ...prevUsersData,
                newUser
            ]
        })
    }
    const deleteUser = (id) => {
        setUsersData(prevUsersData => {
            return prevUsersData.filter(user => user.id !== id);
        })
    }
    return (
        <section className="users-section">
            <div className="heading">
                <h2>users</h2>
            </div>
            <div className="users">
                <div className="table-tools">
                    <div className="add-user-container">
                        <button className="add-user" onClick={() => setShowModal(true)}>add new</button>
                    </div>
                    <div className="table-search-container">
                        <input type="text" name="table-search" value={searchItem} placeholder="Search..." onChange={handleInputChange} />
                        <button className="table-search-btn">
                            {searchBtn.searchIcon && <i className="fas fa-search"></i>}
                            {searchBtn.resetIcon && <i className="fas fa-times" onClick={clearSearchForm}></i>}
                        </button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th>
                                <input id="check-all" type="checkbox" name="check-all" />
                            </th>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Username</th>
                            <th>Action</th>      
                        </tr>
                    </thead>
                    <tbody>
                        {
                            filteredUsers.map((user, index) => {
                                const { id, name, email, username, view } = user;
                                return (
                                    <tr key={id}>
                                        <td>
                                            <input className="check" type="checkbox" name="check" />
                                        </td>
                                        <td>{index + 1}</td>
                                        <td>{name}</td>
                                        <td>{email}</td>
                                        <td>{username}</td>
                                        <td>
                                            <Link to={`/users/${id}`}>
                                                <button disabled={!view ? 'disabled' : ''} className="view-user">view</button>
                                            </Link>
                                            <button className="delete-user" onClick={() => deleteUser(id)}>
                                                <i className="fas fa-trash-alt"></i>
                                            </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                        {filteredUsers.length < 1 && <tr><td colspan="5">No item matches your search</td></tr>}
                    </tbody>
                </table>
            </div>
            {showModal && <div className="users-modal">
                <div className="modal-content">
                    <div className="modal-title">
                        <h2>add new user</h2>
                        <button className="close-modal" onClick={closeModal}>close</button>
                    </div>
                    <div className="new-user-form">
                        <img src={userImage ? URL.createObjectURL(userImage) : dummyImage} alt="user" />
                        <form className="form" onSubmit={handleFormSubmit}>
                            <div className="form-input">
                                <label className="image-label" htmlFor="file">upload photo <i className="fas fa-upload"></i></label>
                                <input id="file" type="file" accept="image/*" onChange={(e) => setUserImage(e.target.files[0])} style={{display: "none"}} />
                            </div>
                            <div className="form-input">
                                <label>Name</label>
                                <input type="text" name="name" value={formData.name} onChange={userInputChange} placeholder="Name" autoComplete="off" required  />
                            </div>
                            <div className="form-input">
                                <label>email</label>
                                <input type="email" name="email" value={formData.email} onChange={userInputChange} placeholder="Email" autoComplete="off" required  />
                            </div>
                            <div className="form-input">
                                <label>username</label>
                                <input type="text" name="username" value={formData.username} onChange={userInputChange} placeholder="Username" autoComplete="off" required  />
                            </div>
                            <div className="form-input">
                                <label>password</label>
                                <input type="password" name="password" value={formData.password} onChange={userInputChange} placeholder="Password" autoComplete="off" required  />
                            </div>
                            <button className="submit-btn">submit</button>
                        </form>
                    </div>
                </div>
            </div>}
        </section>
    )
     
}

export default Users;