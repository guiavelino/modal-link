import { useState } from 'react';
import ImageUploading, { ImageListType } from 'react-images-uploading';
import Resizer from 'react-image-file-resizer';
import { AiOutlineFileImage } from 'react-icons/ai';
import Image from 'next/image';


import styles from './styles.module.scss';

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

export function UploadImage() {
  const [images, setImages] = useState([]);
  const [loadingUpload, setLoadingUpload] = useState(false);

  const maxNumber = 4;

  const onChange = async (imageList: ImageListType) => {
    const resizedImages = await Promise.all(imageList.map(image => resizeFile(image.file, true)));
    const resizedFile = await Promise.all(imageList.map(image => resizeFile(image.file, false)));

    const resizedImageList = imageList.map((image, index) => ({
      ...image,
      file: resizedFile[index],
      dataURL: resizedImages[index]
    }));

    setImages(resizedImageList as never[]);
  };

  return (
    <div className={styles.uploadImageContainer}>
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        acceptType={['jpg', 'jpeg', 'png']}
      >
        {({
          imageList,
          onImageUpload,
          onImageUpdate,
          isDragging,
          dragProps,
          errors
        }) => (
          <div className={styles.uploadImageContent}>
            <div className={styles.uploadImageButtons}>
              {!loadingUpload && (
                  <button
                    style={isDragging ? { color: 'red' } : undefined}
                    onClick={onImageUpload}
                    type="button"
                    className={styles.uploadImageButton}
                    {...dragProps}
                  >
                    <AiOutlineFileImage size={24} /> Selecione as fotos
                  </button>
              )}

              {!loadingUpload && errors && (
                <div className={styles.uploadImageError}>
                  {errors.maxNumber && <span>Quantidade máxima excedida</span>}
                  {errors.acceptType && <span>O tipo de arquivo selecionado não é permitido JPEG, JPG, PNG</span>}
                  {errors.maxFileSize && <span>Este arquivo é muito grande, selecione um menor</span>}
                  {errors.resolution && <span>O arquivo selecionado não corresponde à resolução desejada</span>}
                </div>
              )}
            </div>

            {!loadingUpload && imageList.length > 0 && (
              <div className={styles.uploadImageList}>
                {imageList.map((image, index) => (
                  <div key={`${index} + ${image?.file?.name}`} className={styles.uploadImageListItem}>
                    <Image
                      src={image.dataURL as string}
                      alt=""
                      width={100}
                      height={100}
                      className={styles.uploadImageListItemImage}
                      onClick={() => onImageUpdate(index)}
                    />
                  </div>
                ))}
              </div>
            )}

            {loadingUpload && <p>Enviando imagens... Aguarde!</p>}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}