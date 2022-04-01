import { Button } from '@mui/material'
import './newProduct.css'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { MdAccountTree, MdAttachMoney, MdDescription, MdSpellcheck, MdStorage } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, createProduct } from '../../actions/productsActon'
import { NEW_PRODUCT_RESET } from '../../constants/productConstants'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

const NewProduct = ({history}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, error, success} = useSelector(state=>state.newProduct);

    const [name, setname] = useState('');
    const [price, setprice ] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [stock, setstock] = useState(0);
    const [images, setimages] = useState([]);
    const [imagesPreview, setimagesPreview] = useState([]);
    const categories= [
        'Laptop',
        "Footwear",
        "Bootom",
        "Tops",
        "Attire",
        "Camera",
        "Mobile"
    ]
    useEffect(() => {
      if (error) {
          alert.error(error);
          dispatch(clearError);
      }

      if (success) {
          alert.success('Product Create Successfully');
          history.push('/admin/dashboard');
          dispatch({type: NEW_PRODUCT_RESET});
      }

    }, [dispatch, alert, error,  history, success])
    
    const  createProductSubmitHandler = (e)=>{
        e.preventDefault();

        const myForm = new FormData();

        myForm.set('name', name);
        myForm.set('price', price);
        myForm.set('description', description);
        myForm.set('category', category);
        myForm.set('stock', stock);

        images.forEach((image)=>{
            myForm.append('images', image);
        });
        dispatch(createProduct(myForm));
    }
const createProductImagesChange = e=>{
    const files = Array.from(e.target.files);

    setimages([]);
    setimagesPreview([]);
    files.forEach(file=>{
        const reader =new FileReader();

        reader.onload=()=>{
            if(reader.readyState === 2){
                setimagesPreview((old)=>[...old, reader.result]);
                setimages((old)=>[...old, reader.result]);
            }
        };
        reader.readAsDataURL(file);
    });

};
   return (
    <>
    <MetaData title={'Create Product'}/>
    <div className="dashboard">
        <Sidebar/>
        <div className="newProductContainer">
            <form className='createProductForm' 
            encType='multipart/form-data'
            onSubmit={ createProductSubmitHandler }>
                <h1>Create Product</h1>
                <div>
                    <MdSpellcheck/>
                    <input type="text"
                    placeholder='Product Name'
                    required
                    value={name}
                    onChange={e=>setname(e.target.value)} />
                </div>
                <div>
                    <MdAttachMoney/>
                    <input type="number"
                    placeholder='Price'
                    required
                    value={price}
                    onChange={e=>setprice(e.target.value)} />
                </div>
                <div>
                    <MdDescription/>
                    <textarea
                    placeholder='Product Description'
                    required
                    value={description}
                    onChange={e=>setdescription(e.target.value)
                    }
                    cols='30'
                    rows='1' >
                        </textarea>
                </div>
<div>
    <MdAccountTree/>
    <select onChange={e=>setcategory(e.target.value)}>
        <option value={''}>Choose Category</option>
        {
            categories.map(cate=>(
                <option key={cate} value={cate}>
                    {cate}</option>
            ))
        }
        </select>
</div>
<div>
    <MdStorage/>
    <input type="number"
    placeholder='Stock'
    required
    onChange={e=>setstock(e.target.value)} />
</div>
<div id="createProductFormFile">
    <input type="file" name="avatar" accept='image/'
    multiple 
    onChange={createProductImagesChange}/>
    </div>
    <div id="createProductFormImage">
        {
            imagesPreview.map((image, index)=>(
                <img key={index} src={image} alt={image}/>
            ))
        }
        </div>
        <Button 
        id='createProductBtn'
        type='submit'
        disabled={loading? true:false}>
            Create</Button>
                </form>
            </div>
        </div>
    </>
  )
}

export default NewProduct