import "./CreateRoom.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VietnameseProvinces } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { notification } from "antd";
import { hotelApi } from "../../../services/hotelAPI";

const schema = yup.object().shape({
    capacity: yup.number("Capacity from 1-6").min(1).max(6).required("This field is required"),
    description: yup.string().required("This field is required").trim(),
    price: yup.number().min(0).required("This field is required").typeError('Price must be a number'),
    number: yup.number().min(0).required("This field is required").typeError('Number of room must be a number'),
    room_name: yup.string().required("This field is required").trim(),
    conveniences: yup.object().shape({
        wardrobe: yup.boolean(),
        air_conditioning: yup.boolean(),
        tv: yup.boolean(),
        wifi: yup.boolean(),
        toiletries: yup.boolean(),
        kitchen: yup.boolean(),

    }),

});

function CreateHotel() {
    const dispatch = useDispatch();
    // const [createHotel, { isLoading }] = hotelApi.useCreateHotelMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = async (data) => {
        const conveniences = Object.keys(data.conveniences).map(key => ({
            [key]: data.conveniences[key]
        }));
        data.conveniences = conveniences;

        try {
            // const response = await createHotel(data).unwrap();
            console.log("Created room response:", response);
            notification.success({
                message: "Success",
                description: "Room created successfully!",
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
            <h2 className="title">New Room</h2>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="item-50">
                    <label>Room Name*:</label>
                    <input className="input" type="text" {...register('room_name')} placeholder="Enter room name" />
                    <p className="error-message">{errors.room_name?.message}</p>
                </div>

                <div className="item-50">
                    <label>Price*:</label>
                    <input className="input" type="text" {...register('price')} placeholder="Enter price" />
                    <p className="error-message">{errors.price?.message}</p>
                </div>
                <div className="item-50">
                    <label>Capacity*:</label>
                    <input className="input" type="text" {...register('capacity')} placeholder="Enter capacity of each room " />
                    <p className="error-message">{errors.capacity?.message}</p>
                </div>
                <div className="item-50">
                    <label>Number of room*:</label>
                    <input className="input" type="text" {...register('number')} placeholder="Enter number of room" />
                    <p className="error-message">{errors.number?.message}</p>
                </div>
                <div className="item-100">
                    <label>Description*</label>
                    <textarea className="input" type="text" {...register('description')} placeholder="Describe about room" />
                    <p className="error-message">{errors.description?.message}</p>
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
