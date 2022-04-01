import { Button } from '@mui/material'
import './newProduct.css'
import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { MdAccountTree, MdAttachMoney, MdDescription, MdSpellcheck, MdStorage } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { clearError, getProductDetails, updateProduct } from '../../actions/productsActon'
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants'
import MetaData from '../layout/MetaData'
import Sidebar from './Sidebar'

const UpdateProduct = ({history, match}) => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, error:updateError, isUpdated} = useSelector(state=>state.product);
    const { error, product} = useSelector(state=>state.productDetails);

    const [name, setname] = useState('');
    const [price, setprice ] = useState('');
    const [description, setdescription] = useState('');
    const [category, setcategory] = useState('');
    const [stock, setstock] = useState(0);
    const [images, setimages] = useState([]);
    const [oldimages, setoldimages] = useState([]);
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
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }
    const productId = match.params.id;
    useEffect(() => {
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId))
        }else{
            setname(product.name);
            setprice(product.price);
            setdescription(product.description);
            setcategory(product.category);

            console.log(product.stock);
            setstock(product.stock);
            setoldimages(product.images)
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearError);
        }
        if (error) {
            alert.error(error);
            dispatch(clearError);
        }
    
      if (isUpdated) {
          alert.success('Product Updated Successfully');
          history.push('/admin/products');
          dispatch({type: UPDATE_PRODUCT_RESET});
      }

    }, [dispatch, alert, error,  history, isUpdated, updateError, productId, product])
    
    const  updateProductSubmitHandler = (e)=>{
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
        dispatch(updateProduct(productId, myForm));
    }
const updateProductImagesChange = e=>{
    const files = Array.from(e.target.files);

    setimages([]);
    setimagesPreview([]);
    setoldimages([]);
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
            onSubmit={ updateProductSubmitHandler }>
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
    <select value={capitalizeFirstLetter(category)} onChange={e=>setcategory(e.target.value)}>
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
    value={stock}
    required
    onChange={e=>setstock(e.target.value)} />
</div>
<div id="createProductFormFile">
    <input type="file" name="avatar" accept='image/'
    multiple 
    onChange={updateProductImagesChange}/>
    </div>
    <div id="createProductFormImage">
        { oldimages &&
            oldimages.map((image, index)=>(
                <img key={index} src={image.url} alt={image.url}/>
            ))
        }
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

export default UpdateProduct