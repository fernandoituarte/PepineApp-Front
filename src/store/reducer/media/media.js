import axios from "axios";
import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";

const URL = process.env.NEXT_PUBLIC_URL;

const initialState = {
  media: [],
  error: null,
  loading: false,
  isModal: false,
  status: "",
};

//
export const emptyMedia = createAction("Empty/Media");
export const changeMediaStatus = createAction("Change/MediaStatus");
//
export const uploadImage = createAsyncThunk(
  "Upload/Image",
  async (files, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${URL}/media`, files, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

export const deleteImage = createAsyncThunk(
  "Delete/Image",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${URL}/media/${id}`, {
        withCredentials: true,
      });

      return { id, ...response.data };
    } catch (error) {
      throw rejectWithValue(error.response.data);
    }
  },
);

const mediaReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(emptyMedia, (state) => {
      state.error = null;
      state.loading = false;
      state.isModal = false;
      state.status = "";
    })
    .addCase(changeMediaStatus, (state, action) => {
      state.status = action.payload;
    })
    .addCase(uploadImage.pending, (state) => {
      state.loading = true;
    })
    .addCase(uploadImage.fulfilled, (state, action) => {
      action.payload.secureUrls.map((url) => {
        state.media.push(url);
      });
      state.status = action.payload.status;
      state.loading = false;
    })
    .addCase(uploadImage.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
      state.loading = false;
    })
    .addCase(deleteImage.pending, (state) => {
      state.loading = true;
    })
    .addCase(deleteImage.fulfilled, (state, action) => {
      state.media = state.media.filter((img) => {
        !img.includes(action.payload.id);
      });
      state.status = action.payload.status;
      state.loading = false;
    })
    .addCase(deleteImage.rejected, (state, action) => {
      state.status = action.payload.statusCode;
      state.error = action.payload.message;
      state.media = [];
      state.loading = false;
    });
});

export default mediaReducer;
