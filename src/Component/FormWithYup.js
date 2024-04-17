import React, { useState } from 'react'
import * as Yup from 'yup'

const FormWithYup = () => {
    const[formData, setFormData] = useState({
        firstname :"",
        secondname:"",
        email :"",
        phone:"",
        password :"",
        repassword :"",
        age:"",
        gender:"",
        degree :[],
        birthdate :"",
        meterial :[],
    })

    const[errors,setErrors] = useState({})
    
    const validationSchema = Yup.object({
        firstname : Yup.string().required("First name required"),
        secondname : Yup.string().required("Second name required"),
        email : Yup.string()
              .required("email required") 
              .email("Invalid email"),
        phone :Yup.string()
              .matches(/^\d{10}$/, "Phone number must be 10 digits")
              .required(),
        password : Yup.string()
            .required("Password is required")
            .min(8, "Password must be least 8 characters")
            .matches(/[!@#$%^&*(),.?":{}|<>]/ , "Password must be contain at least one symbol")
            .matches(/[0-9]/, "Password must be contain one Number")
            .matches(/[A-Z]/,"Password must be contain one Uppercase")
            .matches(/[a-z]/, "Password must be contain one Lowercase"),
        repassword : Yup.string()
            .oneOf([Yup.ref("password")], "Password must match")
            .required("repassword is required"),
        age : Yup.number()
            .typeError("Age must be a number")
            .min(18, "You must be at least 18 year old")
            .max(100, "You cannot be older then 100 years"),
        gender : Yup.string().required("gender is required"),
        degree :Yup.array()
            .min(1,"Select at least one degree")
            .required("Select at least one degree"),
        birthdate : Yup.string().required("Date of birth is required"),
        meterial : Yup.array()
            .min(1,"Select at least one meterial")
            .required("Select at least one meterial"),
    })

    const handleFormValidation = async(event) =>{
        event.preventDefault()
        try {
            await validationSchema.validate(formData,{abortEarly:false})
            console.log("Form Submitted" ,formData)
        } catch (error) {
            const newErrors = {}
            console.log(error.inner)
            error.inner.forEach((err) => {
                newErrors[err.path] = err.message;
            })
            setErrors(newErrors)
        }
    }

    const handleChange =(e) =>{
        const{name,value} = e.target;
        setFormData({...formData,
            [name] : value,
        })
    }

    const handleCheckBoxChange =(e)=>{
        const {name, checked} = e.target
        let updateMerial = [...formData.meterial]
        if(checked){
            updateMerial.push(name)
        }else{
            updateMerial = updateMerial.filter((meterial) => meterial !== name)
        }

        setFormData({
            ...formData,
            meterial : updateMerial,
        })
    }

    const handleRadioChange = (e) => {
        const { name, checked } = e.target;
        let updatedDegree = [...formData.degree];

        if (checked) {
            updatedDegree.push(name);
        } else {
            updatedDegree = updatedDegree.filter(degree => degree !== name);
        }

        setFormData({
            ...formData,
            degree: updatedDegree, 
        });
    };
  return (
    <div className='container'>
        <div className='p-3'>
        <form onSubmit={handleFormValidation}>
            <div className="mb-3">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input type="text" className="form-control" id="firstname" name='firstname' value={formData.firstname} onChange={handleChange} />
                
                {errors.firstname && <div className="form-text error">{errors.firstname}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="secondname" className="form-label">Second Name</label>
                <input type="text" className="form-control" id="secondname" name='secondname' value={formData.secondname} onChange={handleChange}/>
                {errors.secondname && <div className="form-text error">{errors.secondname}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" id="email" name='email' value={formData.email} onChange={handleChange}/>
                {errors.email && <div className="form-text error">{errors.email}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Phone</label>
                <input type="number" className="form-control" id="phone" name='phone' value={formData.phone} onChange={handleChange}/>
                {errors.phone && <div className="form-text error">{errors.phone}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" id="password" name='password' value={formData.password} onChange={handleChange}/>
                {errors.password && <div className="form-text error">{errors.password}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="repassword" className="form-label">Re-Password</label>
                <input type="password" className="form-control" id="repassword" name='repassword' value={formData.repassword} onChange={handleChange}/>
                {errors.repassword && <div className="form-text error">{errors.repassword}</div>}
            </div>
            <div className="mb-3">
                <label htmlFor="age" className="form-label">Age</label>
                <input type="number" className="form-control" id="age" name='age' value={formData.age} onChange={handleChange}/>
                {errors.age && <div className="form-text error">{errors.age}</div>}
            </div>
            <div className='d-flex gap-3 mb-3'>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="bachelor"
                        id="flexRadioDefault1"
                        checked={formData.degree.includes('bachelor')}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                        Bachelor's
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="master"
                        id="flexRadioDefault2"
                        checked={formData.degree.includes('master')}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                        Master's
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="engineering"
                        id="flexRadioDefault3"
                        checked={formData.degree.includes('engineering')}
                        onChange={handleRadioChange}
                    />
                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                        Engineering
                    </label>
                </div>
                {errors.degree && <div className="form-text error">{errors.degree}</div>}
            </div>
            <div className='mb-3'>
                <select
                    className="form-select"
                    name='gender'
                    value={formData.gender}
                    onChange={handleChange}
                    aria-label="Default select example"
                >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                </select>
                {errors.gender && <div className="form-text error">{errors.gender}</div>}
            </div>
            <div className='mb-3'>
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input className='form-control' type="date" name="birthdate" id="dob"  value={formData.birthdate} onChange={handleChange}/>
                {errors.birthdate && <div className="form-text error">{errors.birthdate}</div>}
            </div>
            <div className="mb-3 form-check d-flex gap-3">
                <div className='ms-3'>
                    <input type="checkbox" 
                        className="form-check-input" 
                        id="exampleCheck1" name='single' checked={formData.meterial.includes('single')} onChange={handleCheckBoxChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck1">Single</label>
                </div>
                <div className='ms-3'>
                    <input type="checkbox" className="form-check-input" name='married' id="exampleCheck2" checked={formData.meterial.includes('married')}
                    onChange={handleCheckBoxChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck2">Married</label>
                </div>
                <div className='ms-3'>
                    <input type="checkbox" className="form-check-input" name='unmarried' id="exampleCheck3" checked={formData.meterial.includes('unmarried')}
                    onChange={handleCheckBoxChange}/>
                    <label className="form-check-label" htmlFor="exampleCheck3">Unmarried</label>
                </div>
                {errors.meterial && <div className="form-text error">{errors.meterial}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
    </div>
  )
}

export default FormWithYup