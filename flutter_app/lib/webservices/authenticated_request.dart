import 'dart:convert';
import 'package:http/http.dart' as http;
import 'auth.service.dart';

class AuthenticatedRequest {
  final AuthService authService;
  final String baseUrl;

  AuthenticatedRequest({required this.authService, required this.baseUrl});

  Future<void> fetchData() async {
    final token = await authService.getToken();

    if (token == null) {
      // Handle token absence (e.g., navigate to login screen)
      return;
    }

    final response = await http.get(
      Uri.parse('$baseUrl/protected-endpoint'),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer $token',
      },
    );

    if (response.statusCode == 200) {
      final data = jsonDecode(response.body);
      // Process the data
    } else {
      // Handle error
    }
  }
}
