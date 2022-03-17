import React, {useState, useEffect} from 'react';
import { API_BASE_URL } from "../../constants/apiConstants";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import AuthContext from "../../navigation/AuthContext";

export default function RegistrationForm(props) {
    const history = useHistory();

    const redirectToHome = () => {
        history.push("/home");
    };

    const [state , setState] = useState({
        companyName: "",
        industryName: "",
        email : "",
        name: "",
        password : "",
        confirmPassword: "",
        role: "",
        successMessage: null
    });

    const[industries, setIndustries] = useState(null);

    useEffect(() => {
        fetchIndustries();

        async function fetchIndustries() {
            const response = await fetch(API_BASE_URL + "industries");
            const data = await response.json();
            
            if (data.length === 0) {
                var industryTextField = document.getElementById("industryName");
                industryTextField.hidden = false;
                industryTextField.required = true;
                industryTextField.value = "";
            } else {
                state.industryName = data[0].name;
                console.log(state.industryName);
            }

            setIndustries(data);
        }
    }, []);

    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }));
    };

    function createBasicAuthToken(email, password) {
        return 'Basic ' + window.btoa(email + ":" + password);
    }

    const sendDetailsToServer = (updateAuth) => {
        if (state.industryName == "") {
            state.industryName = "Construction";
        }
        
        state.industryName = state.industryName.charAt(0).toUpperCase() + state.industryName.substr(1);
        
        fetch(
            API_BASE_URL + "companies/" + state.industryName + "/addCompany",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    "name": state.companyName
                }),
            }
        ).then(function (response) {
            response.json().then(function(data) {
                console.log(data.id);
                console.log(data.name);
                fetch(
                    API_BASE_URL + "users/admin/registration",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                        },
                        body: JSON.stringify({
                            "companyId": data.id,
                            "email": state.email,
                            "name": state.name,
                            "password": state.password,
                            "role": state.role
                        }),
                    }
                ).then(function (response) {
                    if (response.status === 201) {
                        setState((prevState) => ({
                            ...prevState,
                            successMessage:
                            "Registration successful. Redirecting to home page..",
                        }));
                        updateAuth(true, state.email, "ROLE_ADMIN", createBasicAuthToken(state.email, state.password));
                        redirectToHome();
                    } else if (response.status == 409) {
                        fetch(
                            API_BASE_URL + "companies/" + data.id,
                            {
                                method: "DELETE",
                                headers: {
                                    "Content-Type": "application/json",
                                    "Access-Control-Allow-Origin": "*",
                                },
                            }
                        ).then(function(response) {
                            alert("Email is already registered, please check your email and try again.");
                        })
                    } else {
                        console.log(response.json);
                        alert("There was an error on our side, please try again later.");
                    }
                });
            })
        });
    };

    const handleSubmitClick = (e, updateAuth) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer(updateAuth)    
        } else {
            alert('Passwords do not match');
        }
    }

    const setSelectedIndustry = () => {
        var selectedIndustry = document.getElementById("industryDropdownButton").value;
        var industryTextField = document.getElementById("industryName");

        if (selectedIndustry === "Others") {
            industryTextField.hidden = false;
            industryTextField.required = true;
            industryTextField.value = "";
        } else {
            industryTextField.hidden = true;
            industryTextField.required = false;
            industryTextField.value = "";
            state.industryName = document.getElementById("industryDropdownButton").value;
        }
    }

    return(
        <div style={{display: "flex", justifyContent: "center", marginTop: 50, marginBottom: 50}}>
            <div className="col-12 col-lg-4 login-card mt-2 hv-center" style={{padding:30, paddingTop:40, paddingBottom:50, backgroundColor: 'white', borderRadius:10}}>
                <h3>Registration</h3>
                <br />
                <AuthContext.Consumer>
                    {({ updateAuth }) => (
                        <Form onSubmit={(e) =>  handleSubmitClick(e, updateAuth)}>
                            <Form.Group className="mb-3">
                                <Form.Label>Company Name:</Form.Label>
                                <Form.Control required minLength={5} maxLength={200} type="text" placeholder="Enter company name" value={state.companyName} onChange={handleChange} id="companyName" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Industry:</Form.Label>
                                <br/>
                                    {industries && (
                                        <select name="industryDD" id="industryDropdownButton" style={{padding:10, backgroundColor: "#007bff", color: "white", borderRadius: 10}} onChange={setSelectedIndustry}>
                                            {industries.map((industry, i) => (
                                                <option class="industryOption" key={i} name={industry.name}>
                                                    {industry.name}
                                                </option>))}
                                            <option class="industryOption" name={"Others"}>
                                                Others
                                            </option>
                                        </select>
                                    )}
                                    <Form.Control hidden type="text" placeholder="Enter industry name" onChange={handleChange} style={{marginTop: 10}} id="industryName" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Email address:</Form.Label>
                                <Form.Control required type="email" placeholder="Enter email" value={state.email} onChange={handleChange} id="email" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Name:</Form.Label>
                                <Form.Control required minLength={5} maxLength={30} type="text" placeholder="Enter your name" value={state.name} onChange={handleChange} id="name" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Password:</Form.Label>
                                <Form.Control required minLength={8} type="password" placeholder="Enter your password" value={state.password} onChange={handleChange} id="password" />
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Confirm Password:</Form.Label>
                                <Form.Control required minLength={8} type="password" placeholder="Enter your password again" value={state.confirmPassword} onChange={handleChange} id="confirmPassword"/>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Label>Company Role:</Form.Label>
                                <Form.Control required minLength={2} maxLength={30} type="text" placeholder="Enter your role" value={state.role} onChange={handleChange} id="role" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    )}
                </AuthContext.Consumer>
            </div>
        </div>
    )
}