import { useContext } from "react";

import { RequestModalContext } from "../contexts/RequestModal";
import { IRequestModalContext } from "../contexts/RequestModal/types";

export const useRequestModal = (): IRequestModalContext => useContext(RequestModalContext);
