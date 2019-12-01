package com.example.reconhecimentodeobjetos.adapters;

import android.view.LayoutInflater;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import com.example.reconhecimentodeobjetos.models.VRespostaModel;
import com.example.reconhecimentodeobjetos.R;
import java.util.ArrayList;


public class VResultadoAdapter extends RecyclerView.Adapter<VResultadoAdapter.ViewHolder> {
    private ArrayList<VRespostaModel> classes;

    public VResultadoAdapter(ArrayList<VRespostaModel> classes) {
        this.classes = classes;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LinearLayout view = (LinearLayout) LayoutInflater.from(parent.getContext())
                .inflate(R.layout.recycler_view_item, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        String encontrado=String.valueOf(classes.get(position).getClassName()).replace(".zip","");
        String valor=String.format("%.2f",classes.get(position).getScore()*100);
        holder.score.setText(valor+" %");
        holder.className.setText(encontrado);
    }

    @Override
    public int getItemCount() {
        return classes.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        TextView className;
        TextView score;

        ViewHolder(LinearLayout v) {
            super(v);
            className = v.findViewById(R.id.className);
            score = v.findViewById(R.id.score);
        }
    }
}
