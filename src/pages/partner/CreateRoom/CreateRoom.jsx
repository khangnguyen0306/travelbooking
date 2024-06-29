import "./CreateRoom.scss";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { VietnameseProvinces } from "../../../utils/utils";
import { useDispatch } from "react-redux";
import { notification, Upload, Button } from "antd";
import { roomApi } from "../../../services/roomAPI";
import { UploadOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";

const schema = yup.object().shape({
    capacity_per_room: yup.number("Capacity from 1-6").min(1).max(6).required("This field is required").typeError('Capacity must be a number'),
    description: yup.string().required("This field is required").trim(),
    room_price: yup.number().min(0).required("This field is required").typeError('Price must be a number'),
    number_of_rooms: yup.number().min(0).required("This field is required").typeError('Number of room must be a number'),
    images: yup.mixed().required("This field is required"),
    room_type_name: yup.string().required("This field is required").trim(),
    conveniences: yup.object().shape({
        wardrobe: yup.boolean(),
        air_conditioning: yup.boolean(),
        tv: yup.boolean(),
        wifi: yup.boolean(),
        toiletries: yup.boolean(),
        kitchen: yup.boolean(),
    }),
    types: yup.object().shape({
        luxury: yup.boolean(),
        single_bedroom: yup.boolean(),
        twin_bedroom: yup.boolean(),
        double_bedroom: yup.boolean(),
    }),
});

function CreateRoom() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [createRoom, { isLoading }] = roomApi.useCreateRoomMutation();
    const [putRoomImage, { isLoading: isLicenseLoading, isSuccess, isError, error }] = roomApi.usePutRoomImageMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
        control,
        watch,
    } = useForm({
        resolver: yupResolver(schema),

    });
    const image = watch("images");


    const onSubmit = async (data) => {
        // Xử lý conveniences và types
        const conveniences = Object.keys(data.conveniences).reduce((acc, key) => {
            acc[key] = data.conveniences[key];
            return acc;
        }, {});
        data.conveniences = [conveniences]; // Chuyển conveniences thành một mảng gồm một object

        const types = {
            id: 0, // Giả sử id được cung cấp hoặc thiết lập ở nơi khác
            luxury: data.types.luxury || false,
            single_bedroom: data.types.single_bedroom || false,
            twin_bedroom: data.types.twin_bedroom || false,
            double_bedroom: data.types.double_bedroom || false,
        };
        data.types = types;

        data.hotel_id = Number(id); // Chuyển id từ params thành số nguyên

        // Kiểm tra và xử lý hình ảnh
        if (!image || image.length === 0) {
            notification.error({
                message: "Error",
                description: "An image room file is required.",
            });
            return;
        }

        // Tạo formData để gửi hình ảnh
        const formData = new FormData();
        image.forEach((file, index) => {
            formData.append('images', file);
        });

        try {
            // Gọi API để tạo phòng
            const response = await createRoom(data).unwrap();
            console.log("Created room response:", response);

            // Gọi API để upload hình ảnh cho phòng vừa tạo
            await putRoomImage({ roomTypeId: response?.data?.id, images: formData }).unwrap();

            notification.success({
                message: "Success",
                description: "Room created successfully!",
            });
            reset(); // Reset form sau khi tạo thành công
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
                    <input className="input" type="text" {...register('room_type_name')} placeholder="Enter room name" />
                    <p className="error-message">{errors.room_type_name?.message}</p>
                </div>

                <div className="item-50">
                    <label>Price*:</label>
                    <input className="input" type="text" {...register('room_price')} placeholder="Enter price" />
                    <p className="error-message">{errors.room_price?.message}</p>
                </div>
                <div className="item-50">
                    <label>Capacity*:</label>
                    <input className="input" type="text" {...register('capacity_per_room')} placeholder="Enter capacity of each room " />
                    <p className="error-message">{errors.capacity_per_room?.message}</p>
                </div>
                <div className="item-50">
                    <label>Number of room*:</label>
                    <input className="input" type="text" {...register('number_of_rooms')} placeholder="Enter number of room" />
                    <p className="error-message">{errors.number_of_rooms?.message}</p>
                </div>
                <div className="item-100">
                    <label>Description*</label>
                    <textarea className="input" type="text" {...register('description')} placeholder="Describe about room" />
                    <p className="error-message">{errors.description?.message}</p>
                </div>
                <div className="item-100">
                    <label>Image Room*</label>
                    <Controller
                        name="images" // Thay đổi tên thành 'images'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Upload
                                listType="picture"
                                beforeUpload={(file) => {
                                    onChange([...(value || []), file]); // Thêm file mới vào mảng value hiện tại
                                    return false;
                                }}
                                onRemove={(file) => {
                                    const filteredValue = value.filter((v) => v.uid !== file.uid);
                                    onChange(filteredValue);
                                }}
                                fileList={value ? value.map((file) => ({
                                    uid: file.uid,
                                    name: file.name,
                                    status: 'done',
                                    url: URL.createObjectURL(file),
                                })) : []}
                            >
                                <Button icon={<UploadOutlined />}>Upload</Button>
                            </Upload>
                        )}
                    />


                    <p className="error-message">{errors.images?.message}</p>
                </div>
                <div className="item-100">
                    <h3>Type room:</h3>
                    <div className="conveniences">
                        {Object.keys(schema.fields.types.fields).map(key => (
                            <div className="item-check" key={key}>
                                <Controller
                                    name={`types.${key}`}
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

export default CreateRoom;
