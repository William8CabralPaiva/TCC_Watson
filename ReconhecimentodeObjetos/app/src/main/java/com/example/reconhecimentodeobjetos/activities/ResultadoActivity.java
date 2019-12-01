package com.example.reconhecimentodeobjetos.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.Bundle;
import android.widget.Adapter;
import android.widget.ImageView;
import android.widget.Toast;

import com.example.reconhecimentodeobjetos.R;
import com.example.reconhecimentodeobjetos.adapters.VResultadoAdapter;
import com.example.reconhecimentodeobjetos.models.VRespostaModel;

import java.io.File;
import java.util.ArrayList;

public class ResultadoActivity extends AppCompatActivity {
    String url = "";
    ArrayList<VRespostaModel> classes = new ArrayList<>();

    private RecyclerView mRecyclerView;
    private RecyclerView.Adapter mAdapter;
    private RecyclerView.LayoutManager mLayoutManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_resultado);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.drawable.ic_eye);
        getSupportActionBar().setDisplayUseLogoEnabled(true);
        if (getIntent().getExtras() != null) {
            url = getIntent().getExtras().getString("url");
            classes = getIntent().getExtras().getParcelableArrayList("classes");
        }

        initializeViews();
    }

    private void initializeViews() {
        ImageView imageView = findViewById(R.id.image);
        File imgFile = new File(url);
        if(imgFile.exists()){
            Bitmap myBitmap = BitmapFactory.decodeFile(imgFile.getAbsolutePath());
            imageView.setImageBitmap(myBitmap);
        }

        mRecyclerView = findViewById(R.id.recyclerView);


        mLayoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(mLayoutManager);

        mAdapter = new VResultadoAdapter(classes);
        if(mAdapter.getItemCount()>0) {
            mRecyclerView.setAdapter(mAdapter);
        }else{
            Toast.makeText(ResultadoActivity.this, "Nenhum Item Encontrado", Toast.LENGTH_SHORT).show();
            this.finish();
        }
    }
}
