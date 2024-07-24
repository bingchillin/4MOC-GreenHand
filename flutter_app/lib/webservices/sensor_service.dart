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

  Future<bool> updateMotorStatus(String sensorId, bool newStatus) async {
    final response = await http.patch(
      Uri.parse('$baseUrl/sensor/$sensorId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, bool>{
        'motorStatus': newStatus,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['motorStatus'];
    } else {
      throw Exception('Failed to fetch motor status');
    }
  }

  Future<bool> fetchCurrentMotorStatus(String sensorId) async {
    final response = await http.get(
      Uri.parse('$baseUrl/sensor/$sensorId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['motorStatus'];
    } else {
      throw Exception('Failed to fetch motor status');
    }
  }

  Future<String> addSensorToUser(String sensorId) async {
    final token = await authService.getToken();
    final email = await authService.getEmail();

    if (token == null || email == null) {
      throw Exception('User not authenticated');
    }

    final response = await http.patch(
      Uri.parse('$baseUrl/sensor/$sensorId'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        //'Authorization': 'Bearer $token',
      },
      body: jsonEncode(<String, String>{
        'email': email,
      }),
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      return data['email'];
    } else {
      throw Exception('Failed to update sensor with email');
    }
  }
}
