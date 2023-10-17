import { Dispatch, SetStateAction, useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Resizer from 'react-image-file-resizer';
import Image from 'next/image';

import styles from './styles.module.scss';
import { BiSolidCamera } from 'react-icons/bi';

const resizeFile = (file: any, base64: any) =>
  new Promise(resolve => {
    if (!file) return;

    Resizer.imageFileResizer(
      file,
      720,
      720,
      'WEBP',
      70,
      0,
      uri => {
        resolve(uri);
      },
      base64 ? 'base64' : 'file'
    );
  });

type UploadImageProps = {
    image: never[];
    setImage: Dispatch<SetStateAction<never[]>>;
}

export function UploadImage({ image, setImage }: UploadImageProps) {
  const [loadingUpload, setLoadingUpload] = useState(false);

  const onChange = async (imageList: ImageListType) => {
    const resizedImages = await Promise.all(imageList.map(image => resizeFile(image.file, true)));
    const resizedFile = await Promise.all(imageList.map(image => resizeFile(image.file, false)));

    const resizedImageList = imageList.map((image, index) => ({
      ...image,
      file: resizedFile[index],
      dataURL: resizedImages[index]
    }));

    setImage(resizedImageList as never[]);
  };

  return (
    <div className={styles.uploadImageContainer}>
        <ImageUploading
            multiple
            value={image}
            onChange={onChange}
            maxNumber={1}
            acceptType={['jpg', 'jpeg', 'png']}
        >
            {({
                imageList,
                onImageUpload,
                onImageUpdate,
                errors
            }) => (
                <div className={styles.uploadImageContent}>
                    {!loadingUpload && imageList.length <= 0 && (
                        <button type="button" onClick={onImageUpload} className={styles.uploadImageButton}>
                            Tirar Foto <BiSolidCamera size={24} />
                        </button>
                    )}

                    {!loadingUpload && imageList.length > 0 && (
                        <>
                            {imageList.map((image, index) => (
                                <Image
                                    key={`${index} + ${image?.file?.name}`}
                                    src={image.dataURL as string}
                                    height={100}
                                    width={100}
                                    alt=""
                                    className={styles.uploadImagePreview}
                                    onClick={() => onImageUpdate(index)}
                                />
                            ))}
                        </>
                    )}
                    
                    {!loadingUpload && errors && (
                        <div className={styles.uploadImageError}>
                            {errors.maxNumber && <span>Selecione apenas 1 arquivo.</span>}
                            {errors.acceptType && <span>O tipo de arquivo selecionado não é permitido, apenas tipos JPEG, JPG e PNG são aceitos.</span>}
                            {errors.maxFileSize && <span>Este arquivo é muito grande, selecione um menor.</span>}
                            {errors.resolution && <span>O arquivo selecionado não corresponde à resolução desejada.</span>}
                        </div>
                    )}
                </div>
            )}
        </ImageUploading>
    </div>
  );
}