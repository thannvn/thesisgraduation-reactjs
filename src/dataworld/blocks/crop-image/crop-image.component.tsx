import {Cropper} from "react-cropper";
import "cropperjs/dist/cropper.css";
import './crop-image.scss'

interface CropImageProps {
  src: string,
  setCropper: any
}
export default function CropImage(props: CropImageProps) {
  const {src, setCropper} = props
  return (
    <Cropper
      className='crop-image'
      src={src}
      viewMode={1}
      guides={true}
      initialAspectRatio={11 / 2}
      background={false}
      responsive={true}
      autoCropArea={1}
      checkOrientation={false}
      onInitialized={(instance) => {
        setCropper(instance);
      }}
    />
  )
}