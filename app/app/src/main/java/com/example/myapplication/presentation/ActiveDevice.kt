package com.example.myapplication.presentation

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.widget.Button
import android.widget.EditText
import android.widget.TextView
import androidx.activity.ComponentActivity
import com.example.myapplication.R
import com.example.myapplication.utils.data.APIResponse
import com.example.myapplication.utils.data.GSonRequest
import com.squareup.moshi.JsonAdapter
import com.squareup.moshi.Moshi
import com.squareup.moshi.kotlin.reflect.KotlinJsonAdapterFactory
import okhttp3.Call
import okhttp3.Callback
import okhttp3.FormBody
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.Response
import java.io.IOException


class ActiveDeviceActivity : ComponentActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.active_device)

        val passcode: EditText = findViewById(R.id.passcode)

        val sendButton: Button = findViewById(R.id.button_send)
        sendButton.setOnClickListener {
//            Log.d("ACTIVE", "${passcode.text} ${(background as ColorDrawable).color}")
//            informationText.text = "Testing"
            val informationText: TextView = findViewById(R.id.text_information)
            informationText.text = ""
            sendActiveCode(passcode.text.toString())
        }

    }

    fun changeToMainScreen() {
        val myIntent = Intent(this, MainActivity::class.java)
        myIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
        finishAffinity()
        startActivity(myIntent)
    }

    @SuppressLint("HardwareIds")
    fun sendActiveCode(passcode: String) {
        val androidId = Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID);
        val client = OkHttpClient()

        val moshi = Moshi.Builder()
            .addLast(KotlinJsonAdapterFactory()).build()
        val jsonAdapter: JsonAdapter<APIResponse> = moshi.adapter(APIResponse::class.java)
        Log.d("ANDROID_ID", androidId)
        val formBody = FormBody.Builder()
        formBody.add("deviceId", androidId)
        formBody.add("passcode", passcode)
        val body: FormBody = formBody.build()

        val request = Request.Builder()
            .url("${GSonRequest.apiBaseUrl}/verifyPasscode/")
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                e.printStackTrace()
            }

            override fun onResponse(call: Call, response: Response) {
                response.use {
                    if (!response.isSuccessful) throw IOException("Unexpected code $response")

                    val annotationData = jsonAdapter.fromJson(response.body.string())
                    val check = annotationData?.success
                    val msg = annotationData?.msg
                    val informationText: TextView = findViewById(R.id.text_information)
                    informationText.text = msg
                    if(check == true) {
                        changeToMainScreen()
                    }
                }
            }
        })
    }
}
