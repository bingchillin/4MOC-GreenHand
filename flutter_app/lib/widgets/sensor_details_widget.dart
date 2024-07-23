import 'package:flutter/material.dart';
import '../models/sensor.dart';
import '../webservices/sensor_service.dart';

class SensorDetailsWidget extends StatefulWidget {
  final Sensor sensor;
  final SensorService sensorService;
  final VoidCallback onStatusChanged;

  const SensorDetailsWidget({super.key, required this.sensor, required this.sensorService, required this.onStatusChanged});

  @override
  State<SensorDetailsWidget> createState() => _SensorDetailsWidgetState();
}

class _SensorDetailsWidgetState extends State<SensorDetailsWidget> {
  bool _isLoading = false;
  String? _errorMessage;

  void _toggleMotorStatus() async {
    setState(() {
      _isLoading = true;
      _errorMessage = null;
    });
    try {
      final success = await widget.sensorService.updateMotorStatus(widget.sensor.id, !widget.sensor.motorStatus);
      if (success) {
        // Après une mise à jour réussie, actualisez les données
        widget.onStatusChanged();
      } else {
        setState(() {
          _errorMessage = 'Failed to update status.';
          _isLoading = false;
        });
      }
    } catch (e) {
      print('Error updating motor status: $e'); // Ajoutez des logs pour le débogage
      setState(() {
        _errorMessage = 'An error occurred. Please check your connection and try again.';
        _isLoading = false;
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Row(
              children: [
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        widget.sensor.name,
                        style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                      ),
                      const SizedBox(height: 10),
                      Text("Humidité : ${widget.sensor.humidityLevel}%", style: const TextStyle(fontSize: 16)),
                      const SizedBox(height: 10),
                      Text("Niveau d'eau : ${widget.sensor.waterLevel}%", style: const TextStyle(fontSize: 16)),
                    ],
                  ),
                ),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    if (_isLoading)
                      const CircularProgressIndicator()
                    else
                      ElevatedButton(
                        onPressed: _toggleMotorStatus,
                        child: Text(widget.sensor.motorStatus ? 'On' : 'Off'),
                      ),
                    if (_errorMessage != null)
                      Text(_errorMessage!, style: const TextStyle(color: Colors.red)),
                  ],
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
