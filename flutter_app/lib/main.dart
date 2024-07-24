import 'package:flutter/material.dart';
import 'package:flutter_app/pages/create_sensor_screen.dart';
import 'package:flutter_app/pages/home_screen.dart';
import 'package:flutter_app/pages/login_screen.dart';
import 'package:flutter_app/webservices/auth.service.dart';
import 'package:flutter_app/webservices/sensor_service.dart';

void main() {
  final AuthService authService = AuthService(baseUrl: 'https://www.epe.world');
  final SensorService sensorService = SensorService(
    baseUrl: 'https://www.epe.world',
    authService: authService,
  );

  runApp(MyApp(authService: authService, sensorService: sensorService,));
}

class MyApp extends StatelessWidget {
  final AuthService authService;
  final SensorService sensorService;

  const MyApp({super.key, required this.authService, required this.sensorService});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Auth Demo',
      debugShowCheckedModeBanner: false,
      initialRoute: '/',
      routes: {
        '/': (context) => LoginScreen(authService: authService),
        '/home': (context) => HomeScreen(sensorService: sensorService),
        '/new-sensor': (context) => CreateSensorScreen(sensorService: sensorService),
      },
    );
  }
}
