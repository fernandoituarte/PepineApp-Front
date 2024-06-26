import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  media: [],
  mediaToDelete: [],
  mediaOrder: [],
  loading: false,
  error: null,
  isModal: false,
};

//
export const addImage = createAction("Add/Image");
//
export const retireImage = createAction("Retire/Image");
//
export const emptyMedia = createAction("Empty/Media");
//
export const uploadImage = createAsyncThunk("Upload/Image", async (file) => {
  console.log(file);
  try {
    const response = await axios.post(
      `${URL}/products/media`,
      { file },
      {
        withCredentials: true,
      },
    );
    return response.data.data.m;
  } catch (error) {
    throw error;
  }
});

//
export const deleteImage = createAsyncThunk("Delete/Image", async (id) => {
  try {
    const response = await axios.delete(`${URL}/products/media/${id}`, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
});
//
export const createMediaOrder = createAsyncThunk(
  "Media/Order",
  async (order) => {
    try {
      const response = await axios.post(`${URL}/products/media/order`, order, {
        withCredentials: true,
      });

      return response.data.data;
    } catch (error) {
      throw error;
    }
  },
);

const mediaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addImage, (state, action) => {
      const exists = state.media.some(
        (image) => image.id === action.payload.id,
      );

      if (!exists) {
        state.media.push(action.payload);
      }
    })
    //retireImage
    .addCase(retireImage, (state, action) => {
      const imageID = action.payload;
      state.mediaToDelete.push(action.payload);
      state.media = state.media.filter((image) => image.id !== imageID);
    })
    //emptyMedia
    .addCase(emptyMedia, (state, action) => {
      state.media = [];
    })
    //uploadImage
    .addCase(uploadImage.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(uploadImage.fulfilled, (state, action) => {
      state.loading = false;
      state.media.push(action.payload);
    })
    .addCase(uploadImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    //deleteImage
    .addCase(deleteImage.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(deleteImage.fulfilled, (state, action) => {
      state.loading = false;
    })
    .addCase(deleteImage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(createMediaOrder.pending, (state, action) => {
      state.loading = true;
    })
    .addCase(createMediaOrder.fulfilled, (state, action) => {
      state.media = [];
      state.mediaOrder = [];
      state.productId = null;
      state.isModal = true;
    })
    .addCase(createMediaOrder.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
});

export default mediaReducer;
