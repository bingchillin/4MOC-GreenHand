import 'package:flutter/material.dart';
import 'package:flutter_app/pages/home_screen.dart';
import 'package:flutter_app/pages/login_screen.dart';
import 'package:flutter_app/webservices/auth.service.dart';

void main() {
  final AuthService authService = AuthService(baseUrl: 'http://localhost:3000');

  runApp(MyApp(authService: authService));
}

class MyApp extends StatelessWidget {
  final AuthService authService;

  const MyApp({super.key, required this.authService});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Auth Demo',
      initialRoute: '/',
      routes: {
        '/': (context) => LoginScreen(authService: authService),
        '/home': (context) => HomeScreen(authService: authService),
      },
    );
  }
}
