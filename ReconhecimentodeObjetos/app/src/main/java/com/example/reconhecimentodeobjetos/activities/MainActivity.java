package com.example.reconhecimentodeobjetos.activities;

import androidx.appcompat.app.AppCompatActivity;
import androidx.core.content.FileProvider;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.Toast;

import com.example.reconhecimentodeobjetos.BuildConfig;
import com.example.reconhecimentodeobjetos.R;
import com.example.reconhecimentodeobjetos.models.VRespostaModel;
import com.ibm.watson.developer_cloud.service.security.IamOptions;
import com.ibm.watson.developer_cloud.visual_recognition.v3.VisualRecognition;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassResult;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifiedImages;
import com.ibm.watson.developer_cloud.visual_recognition.v3.model.ClassifyOptions;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import io.reactivex.Single;
import io.reactivex.SingleObserver;
import io.reactivex.SingleOnSubscribe;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.disposables.Disposable;
import io.reactivex.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {

    // IBM WATSON VISUAL RECOGNITION RELATED
    //dgZeZVp24gaRo9kn7I07eQLcSHBPCwJgp4geONyM9On7
    private final String API_KEY ="dqlJAxW_b1LOvloLw5_XyGq43Z4u9ZsUnLnwXLn8zodz";//
    public static final int CODIGO_CAMERA = 567;
    Button btnResultados;
    EditText edUrl;
    ProgressBar progressBar;
    View content;
    String caminhoFoto;

    Single<ClassifiedImages> observable;
    private float threshold = (float) 0.6;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        getSupportActionBar().setDisplayShowHomeEnabled(true);
        getSupportActionBar().setLogo(R.drawable.ic_eye);
        getSupportActionBar().setDisplayUseLogoEnabled(true);

        initializeViews();
        observable = Single.create((SingleOnSubscribe<ClassifiedImages>) emitter -> {
            IamOptions options = new IamOptions.Builder()
                    .apiKey(API_KEY)
                    .build();

            VisualRecognition visualRecognition = new VisualRecognition("2018-03-19", options);
            ClassifyOptions classifyOptions = new ClassifyOptions.Builder()
                    .imagesFile(new File(caminhoFoto))
                    .url(edUrl.getText().toString())//url
                    .classifierIds(Collections.singletonList("DefaultCustomModel_336341345"))
                    .threshold(threshold)
                    .owners(Collections.singletonList("me"))
                    .build();

            ClassifiedImages classifiedImages = visualRecognition.classify(classifyOptions).execute();
            emitter.onSuccess(classifiedImages);
        }).subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread());
    }

    private void goToNext(String url, List<ClassResult> resultList) {
        progressBar.setVisibility(View.GONE);
        content.setVisibility(View.VISIBLE);

        // Checking if image has a class named "explicit". If yes, then reject and show an error msg as a Toast
        for (ClassResult result : resultList) {
            if (result.getClassName().equals("explicit")) {
                Toast.makeText(this, "Fora do Contexto", Toast.LENGTH_LONG).show();
                return;
            }
        }


        ArrayList<VRespostaModel> classes = new ArrayList<>();
        for (ClassResult result : resultList) {
            VRespostaModel model = new VRespostaModel();
            model.setClassName(result.getClassName());
            model.setScore(result.getScore());
            classes.add(model);
            Toast.makeText(this, model.getClassName(), Toast.LENGTH_LONG).show();
        }
        Intent i = new Intent(MainActivity.this, ResultadoActivity.class);
        i.putExtra("url", url);
        i.putParcelableArrayListExtra("classes", classes);
        startActivity(i);
    }

    private void initializeViews() {
        edUrl = findViewById(R.id.et_url);
        btnResultados = findViewById(R.id.btn_fetch_results);
        progressBar = findViewById(R.id.progress_bar);
        progressBar.setVisibility(View.GONE);
        content = findViewById(R.id.ll_content);
    }
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (resultCode == Activity.RESULT_OK ) {
            if (requestCode == CODIGO_CAMERA) {
                    content.setVisibility(View.GONE);
                    progressBar.setVisibility(View.VISIBLE);
                    observable.subscribe(new SingleObserver<ClassifiedImages>() {
                        @Override
                        public void onSubscribe(Disposable d) {

                        }

                        @Override
                        public void onSuccess(ClassifiedImages classifiedImages) {
                            System.out.println(classifiedImages.toString());
                            List<ClassResult> resultList = classifiedImages.getImages().get(0).getClassifiers().get(0).getClasses();
                            goToNext(caminhoFoto, resultList);
                        }

                        @Override
                        public void onError(Throwable e) {
                            System.out.println(e.getMessage());
                        }
                    });
            }
        }
    }

    public void Camera(View view) {
        Intent intentTirarFoto = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        caminhoFoto=getExternalFilesDir(null) + "/" + System.currentTimeMillis() + ".jpg";
        File foto = new File(caminhoFoto);
        Uri fotoURI = FileProvider.getUriForFile(MainActivity.this, BuildConfig.APPLICATION_ID + ".provider", foto);
        intentTirarFoto.putExtra(MediaStore.EXTRA_OUTPUT, fotoURI);
        startActivityForResult(intentTirarFoto, CODIGO_CAMERA);
    }

    public void  BuscaImagem(View view){
        if ((edUrl.getText().toString().length()>5)&&
            (edUrl.getText().toString().endsWith(".png") ||
            edUrl.getText().toString().endsWith(".jpg") ||
            edUrl.getText().toString().endsWith(".jpeg"))) {

                content.setVisibility(View.GONE);
                progressBar.setVisibility(View.VISIBLE);
                observable.subscribe(new SingleObserver<ClassifiedImages>() {
                    @Override
                    public void onSubscribe(Disposable d) {

                    }

                    @Override
                    public void onSuccess(ClassifiedImages classifiedImages) {
                        System.out.println(classifiedImages.toString());
                        List<ClassResult> resultList = classifiedImages.getImages().get(0).getClassifiers().get(0).getClasses();
                        String url = classifiedImages.getImages().get(0).getSourceUrl();
                        goToNext(url, resultList);
                    }

                    @Override
                    public void onError(Throwable e) {
                        System.out.println(e.getMessage());
                    }
                });
        } else {
            Toast.makeText(MainActivity.this, "URL Inválida ", Toast.LENGTH_SHORT).show();
        }
    }
}