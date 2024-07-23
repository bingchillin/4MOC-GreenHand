import 'package:flutter/material.dart';
import '../models/sensor.dart';

class SensorDetailsWidget extends StatelessWidget {
  final Sensor sensor;

  const SensorDetailsWidget({super.key, required this.sensor});

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
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      sensor.name,
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
                    const SizedBox(height: 10),
                    Text("Humidité : ${sensor.humidityLevel}%", style: const TextStyle(fontSize: 16)),
                    const SizedBox(height: 10),
                    Text("Niveau d'eau : ${sensor.waterLevel}%", style: const TextStyle(fontSize: 16)),
                  ],
                ),
                const Spacer(),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: [
                    Text(
                      sensor.motorStatus ? 'On' : 'Off',
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                    ),
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