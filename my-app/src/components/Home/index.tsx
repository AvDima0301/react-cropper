import "cropperjs/dist/cropper.min.css";
import * as React from 'react';
import { Modal, Button, Row, Col } from 'antd';
import Cropper from "cropperjs";

const HomePage : React.FC = () => {
    const imgRef = React.useRef<HTMLImageElement>(null);
    const prevRef = React.useRef<HTMLImageElement>(null);
    const [cropperObj, setCropperObj] = React.useState<Cropper>();

    const [visible, setVisible] = React.useState<boolean>(false);
    const [imageView, setImageView] = React.useState<string>("https://www.securityindustry.org/wp-content/uploads/sites/3/2018/05/noimage.png");

    const handleShow = async () => {
        await setVisible(true);
        let cropper = cropperObj;
        if (!cropperObj) {
          cropper = new Cropper(imgRef.current as HTMLImageElement, {
            aspectRatio: 1 / 1,
            viewMode: 1,
            preview: prevRef.current as HTMLImageElement,
          });
        }
        cropper?.replace("https://vovalohika.tk/images/1200_431btv0l.ykj.jpeg");
        setCropperObj(cropper);
    }

    const handleCropped = async () => {
        const base64 = cropperObj?.getCroppedCanvas().toDataURL() as string;
        console.log("base64", base64);
        setVisible(false);
    }

    return (
      <>
        <h1>Головна сторінка</h1>
        {/* <Button type="primary" onClick={handleShow}>
          Завантажити фото
        </Button> */}
        <div>
          <label htmlFor="uploadfile">
            <img src={imageView} alt="фото" width="250" />
          </label>
          <input type="file" id="uploadfile" style={{display: "none"}} />
        </div>

        <Modal
          title="Вибір фото"
          centered
          visible={visible}
          onOk={handleCropped}
          onCancel={() => setVisible(false)}
          width={1000}
          maskClosable={false}
        >
          <Row gutter={[8, 0]}>
            <Col md={18} xs={24}>
              <div>
                <img
                  ref={imgRef}
                  src="https://vovalohika.tk/images/1200_431btv0l.ykj.jpeg"
                  width="100%"
                />
              </div>
            </Col>
            <Col md={6} xs={24}>
              <div
                ref={prevRef}
                style={{
                  height: "100px",
                  border: "1px solid silver",
                  overflow: "hidden",
                }}
              ></div>
            </Col>
          </Row>
        </Modal>
      </>
    );
}

export default HomePage;