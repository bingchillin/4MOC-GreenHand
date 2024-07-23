import 'package:flutter/material.dart';
import '../models/sensor.dart';
import '../webservices/sensor_service.dart';
import '../widgets/sensor_details_widget.dart';

class HomeScreen extends StatefulWidget {
  final SensorService sensorService;

  const HomeScreen({super.key, required this.sensorService});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  late Future<Sensor?> _sensorFuture;

  @override
  void initState() {
    super.initState();
    _sensorFuture = widget.sensorService.getSensorForUser();
  }

  Future<void> _refreshSensor() async {
    setState(() {
      _sensorFuture = widget.sensorService.getSensorForUser();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Sensor Details'),
        actions: [
          IconButton(
            icon: Icon(Icons.refresh),
            onPressed: _refreshSensor,
          ),
        ],
      ),
      body: FutureBuilder<Sensor?>(
        future: _sensorFuture,
        builder: (context, snapshot) {
          if (snapshot.connectionState == ConnectionState.waiting) {
            return const Center(child: CircularProgressIndicator());
          } else if (snapshot.hasError) {
            return Center(child: Text('Error: ${snapshot.error}'));
          } else if (!snapshot.hasData || snapshot.data == null) {
            return Center(
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  const Text('No sensor found for the user'),
                  ElevatedButton(
                    onPressed: () {
                      Navigator.pushNamed(context, '/new-sensor');
                    },
                    child: const Text('Add Sensor'),
                  ),
                ],
              ),
            );
          } else {
            final sensor = snapshot.data!;
            return Padding(
              padding: const EdgeInsets.all(16),
              child: SensorDetailsWidget(
                sensor: sensor,
                sensorService: widget.sensorService,
                onStatusChanged: _refreshSensor, // Ajoutez ici le callback pour actualiser
              ),
            );
          }
        },
      ),
    );
  }
}
