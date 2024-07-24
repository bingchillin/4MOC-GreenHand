import 'package:flutter/material.dart';
import '../webservices/sensor_service.dart';

class CreateSensorScreen extends StatefulWidget {
  final SensorService sensorService;

  const CreateSensorScreen({super.key, required this.sensorService});

  @override
  _CreateSensorScreenState createState() => _CreateSensorScreenState();
}

class _CreateSensorScreenState extends State<CreateSensorScreen> {
  final _sensorIdController = TextEditingController();
  bool _isLoading = false;
  String? _errorMessage;

  Future<void> _submitForm() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });

    try {
      await widget.sensorService.addSensorToUser(_sensorIdController.text);
      Navigator.pop(context, true); // Return true to indicate success
    } catch (e) {
      setState(() {
        _errorMessage = 'Failed to add sensor: $e';
      });
    } finally {
      setState(() {
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Add New Sensor'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _sensorIdController,
              decoration: InputDecoration(labelText: 'Sensor ID'),
            ),
            SizedBox(height: 20),
            _isLoading
                ? CircularProgressIndicator()
                : ElevatedButton(
              onPressed: _submitForm,
              child: Text('Submit'),
            ),
            if (_errorMessage != null)
              Text(
                _errorMessage!,
                style: TextStyle(color: Colors.red),
              ),
          ],
        ),
      ),
    );
  }
}