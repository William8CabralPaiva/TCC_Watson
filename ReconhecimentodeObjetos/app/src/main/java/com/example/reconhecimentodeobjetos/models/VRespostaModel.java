package com.example.reconhecimentodeobjetos.models;

import android.os.Parcel;
import android.os.Parcelable;


public class VRespostaModel implements Parcelable {
    public static final Creator<VRespostaModel> CREATOR = new Creator<VRespostaModel>() {
        @Override
        public VRespostaModel createFromParcel(Parcel in) {
            return new VRespostaModel(in);
        }

        @Override
        public VRespostaModel[] newArray(int size) {
            return new VRespostaModel[size];
        }
    };
    private String className;
    private float score;

    public VRespostaModel() {
        className = "";
        score = 0.0F;
    }

    protected VRespostaModel(Parcel in) {
        className = in.readString();
        if (in.readByte() == 0) {
            score = 0.0F;
        } else {
            score = in.readFloat();
        }
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Float getScore() {
        return score;
    }

    public void setScore(Float score) {
        this.score = score;
    }

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeString(className);
        if (score == 0.0F) {
            dest.writeByte((byte) 0);
        } else {
            dest.writeByte((byte) 1);
            dest.writeFloat(score);
        }
    }
}
