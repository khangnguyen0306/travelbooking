import "./CreateHotel.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VietnameseProvinces } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { notification, Button, Upload } from "antd";
import { UploadOutlined } from '@ant-design/icons';
import { hotelApi } from "../../../services/hotelAPI";

const schema = yup.object().shape({
    rating: yup.number("Rating from 1-5").min(1).max(5).required("This field is required"),
    description: yup.string().required("This field is required").trim(),
    brand: yup.string(),
    hotel_name: yup.string().required("This field is required").trim(),
    businessLicense: yup.array().of(yup.mixed().required("This field is required")).min(1, "Business license file is required"),
    conveniences: yup.object().shape({
        free_breakfast: yup.boolean(),
        pick_up_drop_off: yup.boolean(),
        restaurant: yup.boolean(),
        bar: yup.boolean(),
        pool: yup.boolean(),
        free_internet: yup.boolean(),
        reception_24h: yup.boolean(),
        laundry: yup.boolean(),
    }),
    location: yup.object().shape({
        address: yup.string().required("This field is required").trim(),
        province: yup.string().required("This field is required").trim(),
    }),
});

function CreateHotel() {
    const dispatch = useDispatch();
    const [createHotel, { isLoading }] = hotelApi.useCreateHotelMutation();
    const [putLicense, { isLoading: isLicenseLoading, isSuccess, isError, error }] = hotelApi.usePutLicenseMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        setValue,
        watch,
    } = useForm({
        resolver: yupResolver(schema),
    });

    const businessLicense = watch("businessLicense");

    const onSubmit = async (data) => {
        const conveniences = Object.keys(data.conveniences).map(key => ({
            [key]: data.conveniences[key]
        }));
        data.conveniences = conveniences;

        // Check if businessLicense files are selected
        if (!businessLicense || businessLicense.length === 0) {
            notification.error({
                message: "Error",
                description: "Business license files are required.",
            });
            return;
        }

        const formData = new FormData();
        businessLicense.forEach(file => {
            formData.append('license', file);
        });

        try {
            const response = await createHotel(data).unwrap();
            console.log("Created hotel response:", response);

            await putLicense({ idHotel: response?.data?.id, license: formData }).unwrap();

            notification.success({
                message: "Success",
                description: "Hotel created successfully!",
            });
            reset();
        } catch (error) {
            notification.error({
                message: "Error",
                description: error.message,
            });
            console.log("Error:", error.message);
            console.log("Submitted data:", data);
        }
    };

    return (
        <div className="create-hotel-wrapper">
            <h2 className="title">New Hotel</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="item-50">
                    <label>Hotel Name*</label>
                    <input className="input" type="text" {...register('hotel_name')} placeholder="Enter hotel name" />
                    <p className="error-message">{errors.hotel_name?.message}</p>
                </div>
                <div className="item-25">
                    <label>Rating* </label>
                    <input className="input" type="number" {...register('rating')} placeholder="Enter rating star" defaultValue={1} />
                    <p className="error-message">{errors.rating?.message}</p>
                </div>
                <div className="item-25">
                    <label>Brand: </label>
                    <input className="input" type="text" {...register('brand')} placeholder="Enter brand" />
                    <p className="error-message">{errors.brand?.message}</p>
                </div>
                <div className="item-100">
                    <label>Description*</label>
                    <textarea className="input" type="text" {...register('description')} placeholder="Describe about hotel" />
                    <p className="error-message">{errors.description?.message}</p>
                </div>
                <div className="item-100">
                    <label>Business License*</label>
                    <Controller
                        name="businessLicense"
                        control={control}
                        render={({ field: { onChange, onBlur, value, ref } }) => (
                            <Upload
                                listType="picture"
                                beforeUpload={(file) => {
                                    // Append the new file to the existing value array
                                    const newValue = [...(value || []), file];
                                    onChange(newValue);
                                    return false; // Prevent default upload behavior
                                }}
                                onRemove={(file) => {
                                    // Remove the file from value array
                                    const newValue = (value || []).filter(
                                        (item) => item.uid !== file.uid
                                    );
                                    onChange(newValue);
                                }}
                                fileList={(value || []).map((file) => ({
                                    uid: file.uid,
                                    name: file.name,
                                    status: "done",
                                    url: URL.createObjectURL(file)
                                }))}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        )}
                    />
                    <p className="error-message">{errors.businessLicense?.message}</p>
                </div>
                <div className="item-100">
                    <h3>Location:</h3>
                    <div className="location">
                        <div className="item-75">
                            <label>Address*</label>
                            <input className="input" type="text" {...register('location.address')} placeholder="Enter address" />
                            <p className="error-message">{errors.location?.address?.message}</p>
                        </div>
                        <div className="item-25">
                            <label>Province*</label>
                            <select className="input" {...register('location.province')} >
                                {VietnameseProvinces.map((province, index) => (
                                    <option key={index} value={province}>{province}</option>
                                ))}
                            </select>
                            <p className="error-message">{errors.location?.province?.message}</p>
                        </div>
                    </div>
                </div>
                <div className="item-100">
                    <h3>Conveniences:</h3>
                    <div className="conveniences">
                        {Object.keys(schema.fields.conveniences.fields).map(key => (
                            <div className="item-check" key={key}>
                                <Controller
                                    name={`conveniences.${key}`}
                                    control={control}
                                    render={({ field }) => (
                                        <input type="checkbox" {...field} />
                                    )}
                                />
                                <label className="label">
                                    {key.slice(0, 1).toUpperCase().concat(key.slice(1, key.length)).replace(
                                        '_',
                                        ' '
                                    )}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="btn-group">
                    <button className="cancel" type="reset" onClick={() => {
                        reset();
                        window.history.back();
                    }}>
                        Cancel
                    </button>
                    <button className="create" type="submit">Create</button>
                </div>
            </form>
        </div>
    );
}

export default CreateHotel;
