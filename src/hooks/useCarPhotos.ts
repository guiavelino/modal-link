import { useContext } from "react";

import { CarPhotosContext, ICarPhotosContext } from "../contexts/CarPhotosContext";

export const useCarPhotos = (): ICarPhotosContext => useContext(CarPhotosContext);
