/* While this template provides a good starting point for using Wear Compose, you can always
 * take a look at https://github.com/android/wear-os-samples/tree/main/ComposeStarter and
 * https://github.com/android/wear-os-samples/tree/main/ComposeAdvanced to find the most up to date
 * changes to the libraries and their usages.
 */

package com.example.myapplication.presentation

import android.Manifest
import android.annotation.SuppressLint
import android.content.Intent
import android.content.pm.PackageManager
import android.os.Build
import android.os.Bundle
import android.provider.Settings
import android.util.Log
import android.view.WindowManager
import android.widget.Button
import androidx.activity.ComponentActivity
import androidx.annotation.RequiresApi
import androidx.core.content.ContextCompat
import com.example.myapplication.R
import com.example.myapplication.utils.data.APIResponse
import com.example.myapplication.utils.data.GSonRequest
import com.google.android.gms.tasks.OnCompleteListener
import com.google.firebase.messaging.FirebaseMessaging
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

class MainActivity : ComponentActivity() {

    private val TAG = "____Main___"
    private var hasSensorPermission = false
    private var hasRecordPermission = false
    private var hasCoastLocationPermission = false
    private var hasFineLocationPermission = false
    var loggedIn = false

    @SuppressLint("HardwareIds", "WearRecents")
    @RequiresApi(Build.VERSION_CODES.TIRAMISU)
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.running)
        hasSensorPermission = checkPermission(Manifest.permission.BODY_SENSORS)
        hasRecordPermission = checkPermission(Manifest.permission.RECORD_AUDIO)
        hasCoastLocationPermission = checkPermission(Manifest.permission.ACCESS_COARSE_LOCATION)
        hasFineLocationPermission = checkPermission(Manifest.permission.ACCESS_FINE_LOCATION)
        if (hasSensorPermission && hasRecordPermission && hasCoastLocationPermission && hasFineLocationPermission) {
            val deviceId = Settings.Secure.getString(contentResolver, Settings.Secure.ANDROID_ID)
            checkDevice(deviceId)

            val controlButton: Button = findViewById(R.id.control_button)
            controlButton.setOnClickListener {
                if (loggedIn) {
                    logout(deviceId)
                } else {
                    checkDevice(deviceId)
                }
            }
        } else {
            changeToPermissionRequestScreen()

        }
        window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON)
    }

    fun changeToActiveDeviceScreen() {
        val myIntent = Intent(this, ActiveDeviceActivity::class.java)
        myIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
        finishAffinity()
        startActivity(myIntent)
    }

    private fun changeToPermissionRequestScreen() {
        val myIntent = Intent(this, PermissionRequestActivity::class.java)
        myIntent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TASK)
        finishAffinity()
        startActivity(myIntent)

    }

    @SuppressLint("HardwareIds")
    private fun checkPermission(permission: String): Boolean { // step 3 started (according to content detail)

        // Runtime permission ------------
        // Permission has not been granted, so request it
        return ContextCompat.checkSelfPermission(this, permission) == PackageManager.PERMISSION_GRANTED
    }

    private fun getDeviceInformation(): String {
        return "${Build.MANUFACTURER} ${Build.MODEL}"
    }

    private fun checkDevice(androidId: String) {
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(OnCompleteListener { task ->
                if (!task.isSuccessful) {
                    Log.w(TAG, "FCM registration token failed", task.exception)
                    return@OnCompleteListener
                }

                val token = task.result
                Log.d(TAG, token)
                Log.d("ANDROID_ID", androidId)

                val moshi = Moshi.Builder()
                    .addLast(KotlinJsonAdapterFactory()).build()

                val formBody = FormBody.Builder()
                formBody.add("deviceId", androidId)
                formBody.add("firebaseToken", token.toString())
                formBody.add("deviceInformation", getDeviceInformation())

                val request = Request.Builder()
                    .url("${GSonRequest.apiBaseUrl}/checkDevice/")
                    .post(formBody.build())
                    .build()

                val client = OkHttpClient()
                client.newCall(request).enqueue(object : Callback {
                    override fun onFailure(call: Call, e: IOException) {
                        e.printStackTrace()
                    }

                    override fun onResponse(call: Call, response: Response) {
                        response.use {
                            if (!response.isSuccessful) throw IOException("Unexpected code $response")

                            val jsonAdapter: JsonAdapter<APIResponse> = moshi.adapter(APIResponse::class.java)
                            val annotationData = jsonAdapter.fromJson(response.body.string())
                            val check = annotationData?.msg
                            if (check != null) {
                                Log.d(TAG, check)
                                if (check == "0") {
                                    changeToActiveDeviceScreen()
                                    loggedIn = false
                                } else {
                                    loggedIn = true
                                    val controlButton: Button = findViewById(R.id.control_button)
                                    controlButton.text = "Stop"
                                }
                            }
                        }
                    }
                })
            })
    }

    private fun logout(androidId: String) {
        FirebaseMessaging.getInstance().getToken()
            .addOnCompleteListener(OnCompleteListener<String?> { task ->
                if (!task.isSuccessful) {
                    Log.w(TAG, "FCM registration token failed", task.exception)
                    return@OnCompleteListener
                }

                // Get new FCM registration token
                val token = task.result

                // Log and toast
                val firebaseToken = token
                Log.d(TAG, firebaseToken)

                val client = OkHttpClient()

                Log.d("ANDROID_ID", androidId)
                val formBody = FormBody.Builder()
                formBody.add("deviceId", androidId)
                formBody.add("firebaseToken", firebaseToken.toString())
                val body: FormBody = formBody.build()

                val request = Request.Builder()
                    .url("${GSonRequest.apiBaseUrl}/stopRunning/")
                    .post(body)
                    .build()
                client.newCall(request).enqueue(object : Callback {
                    override fun onFailure(call: Call, e: IOException) {
                        e.printStackTrace()
                    }

                    override fun onResponse(call: Call, response: Response) {
                        response.use {
                            if (!response.isSuccessful) throw IOException("Unexpected code $response")

                            val controlButton: Button = findViewById(R.id.control_button)
                            controlButton.text = "Run"
                            loggedIn = false
                        }
                    }
                })
            })

    }

}
