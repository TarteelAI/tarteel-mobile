package com.mmmoussa.iqra;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.wenkesj.voice.VoicePackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.smixx.fabric.FabricPackage;
import com.wenkesj.voice.VoicePackage;
import com.avishayil.rnrestart.ReactNativeRestartPackage;
import com.AlexanderZaytsev.RNI18n.RNI18nPackage;
import com.reactlibrary.androidsettings.RNANAndroidSettingsLibraryPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativeRestartPackage(),
            new VoicePackage(),
            new ReactNativeConfigPackage(),
            new FabricPackage(),
            new VoicePackage(),
            new ReactNativeRestartPackage(),
            new RNI18nPackage(),
            new RNANAndroidSettingsLibraryPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
