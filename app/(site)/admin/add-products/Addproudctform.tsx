
"use client"
import Headings from '@/app/components/products/Headings'
import CustomcheckBox from '@/components/inputs/CustomcheckBox'
import Textarea from '@/components/inputs/Textarea'
import CateGoryIN from '@/components/inputs/categoryInputs'
import Input from '@/components/inputs/input'
import categorydata from '@/utils/category'
import colors from '@/utils/colors'
import React, { Fragment, useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import SetColor from '@/components/inputs/setcolors'
import Button from '@/app/components/products/Button'
import { toast } from 'react-toastify'
import storage from '@/libs/Firebase'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import axios from 'axios'

export type ImgeType = {
    color: string;
    colorCode: string;
    image: File | null
}

export type UploadedImgeType = {
    color: string;
    colorCode: string;
    image: string | null
}
const Addproudctform = () => {
    const [isLoading, setLoading] = useState<boolean>(false)
    const [Images, setImage] = useState<ImgeType[] | null>(null)
    const [isProductCreated, setIsproductCreated] = useState<boolean>(false)



    const { register, watch, getValues, handleSubmit, setValue, reset, formState: { errors } } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            brand: "",
            description: "",
            price: 0,
            inStock: true,
            images: [],
            reviews: "",
            // cateGory: "",
        }
    })

    const uploadeImage: UploadedImgeType[] = []
    const onsubmits: SubmitHandler<FieldValues> = async (data) => {
        setLoading(true);

        try {
            // Check if category and images are selected
            if (!data.category) {
                throw new Error('Category is not selected');
            }

            if (!data.images || data.images.length === 0) {
                throw new Error('Images are not selected');
            }

            toast('Creating product, please wait...');

            const uploadTasks = data.images.map(async (item: ImgeType) => {
                if (item.image) {
                    const filename = new Date().getTime() + '-' + item.image?.name;
                    const storageRef = ref(storage, `products/${filename}`);
                    const uploadTask = uploadBytesResumable(storageRef, item?.image);

                    return new Promise<void>((resolve, reject) => {
                        uploadTask.on(
                            'state_changed',
                            (snapshot) => {
                                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                                switch (snapshot.state) {
                                    case 'paused':
                                        console.log('Upload is Paused');
                                        break;
                                    case 'running':
                                        console.log('Upload is running');
                                        break;
                                }
                            },
                            (error) => {
                                console.error(error, 'Error uploading images');
                                reject(error);
                            },
                            async () => {
                                // Get the download URL and update state
                                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                                // setUploadedImages((prevImages: UploadedImgeType) => [
                                uploadeImage.push({
                                    ...item,
                                    image: downloadURL
                                })
                                console.log(downloadURL)
                                console.log(uploadeImage, 'uploadeImages')
                                resolve();
                            }
                        );
                    });
                }
            });

            // Wait for all upload tasks to complete
            await Promise.all(uploadTasks);

            toast.success('Product created successfully!');
            const productData = { ...data, images: uploadeImage }
            // console.log(productData, "product data is Upto date")

            await axios.post('http://localhost:3000/api/v1/product', productData).then((e) => {

                console.log(e, 'product is creted succesfully')

                // toast.success('product is created last')


            }).catch((e) => {
                console.log('error', e)
            })
            reset()
            setImage(null)
            // console.log(crete, 'createdProducts')

        } catch (error) {
            toast.error('an aucwork to upload images');
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        setcustomValue('images', Images);
    }, [Images])

    console.log('uploaded images', uploadeImage)

    useEffect(() => {
        if (isProductCreated) {
            reset();
            setImage(null)
            setIsproductCreated(false)

        }
    }, [isProductCreated])




    const removEImgFromState = useCallback(
        (value: ImgeType) => {
            setImage((prev) => {
                if (prev) {
                    const filterImages = prev.filter((item) => item.color !== value.color)
                    return filterImages
                }
                return prev
            })
        },
        [],
    )


    /// Category Data manuplation
    const setcustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true
        })
    }

    const addImageTostate = useCallback(
        (value: ImgeType) => {
            setImage((prev) => {
                if (!prev) {
                    return [value]
                }
                return [...prev, value]
            })
        },
        [],
    )

    console.log(Images, 'images')
    const category = watch('category')
    return (
        <Fragment>

            <Headings title='Add A Product' center />
            <Input errors={errors} register={register} label='Name' required={true} id='name' disabled={isLoading} />
            <Input errors={errors} register={register} label='price' required={true} id='price' type='number' disabled={isLoading} />

            <Input errors={errors} register={register} label='brand' required={true} id='brand' disabled={isLoading} />

            <Textarea id='description' errors={errors} register={register} label='description' required={true} disabled={isLoading} />


            <CustomcheckBox id='inStock' label='Instock' register={register} disabled={isLoading} />


            <div className=" mt-8 w-full font-medium">
                <div className=" mb-2 fosem" >Select A category</div>
                <div className=" grid grid-cols-2 md:grid-cols-3 gap-6 max-h-[50vh] overflow-y-auto">
                    {
                        categorydata.map((item) => {
                            if (item.label == "All") return null

                            return (
                                <div key={item.label} className="">
                                    <CateGoryIN selected={category === item.label} label={item.label} Icon={item.icon} onclick={(category) => { setcustomValue('category', category) }} key={item.label} />
                                </div>
                            )
                        })
                    }

                </div>
            </div>

            <div className=" w-full flex flex-col flex-wrap gap-4">
                <div className="  font-bold">Select The availabe product colors and upload  theie image </div>

                <div className="">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus officia iste accusamus aliquam dicta minima animi totam
                </div>
                <div className=" grid grid-cols-2 md:grid-cols-3 w-full gap-6">
                    {
                        colors.map((item, index) => (
                            // <div className="">{item.color}</div>
                            <SetColor key={item.color} isProductCreted={false} item={item} addImgeTostate={addImageTostate} removeImgFromState={removEImgFromState} />
                        ))
                    }
                </div>
            </div>
            <Button label={isLoading ? 'Loading...' : "Add product"} onclick={handleSubmit(onsubmits)} />
        </Fragment>
    )
}

export default Addproudctform