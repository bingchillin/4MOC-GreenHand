import 'dart:convert';
import 'package:http/http.dart' as http;
import '../models/sensor.dart';
import 'auth.service.dart';

class SensorService {
  final String baseUrl;
  final AuthService authService;

  SensorService({required this.baseUrl, required this.authService});

  Future<Sensor?> getSensorForUser() async {
    final token = await authService.getToken();
    final email = await authService.getEmail();

    if (token == null || email == null) {
      throw Exception('User not authenticated');
    }

    final response = await http.get(
      Uri.parse('$baseUrl/sensor/user/$email'),
      headers: {
        'Content-Type': 'application/json',
        //'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      // Gérer le cas où la réponse est un tableau
      if (data is List) {
        // Supposons que vous voulez le premier élément du tableau
        return data.isNotEmpty ? Sensor.fromJson(data[0]) : null;
      } else {
        return Sensor.fromJson(data);
      }
    } else {
      return null;
    }
  }
}
