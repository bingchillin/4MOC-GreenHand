class Sensor {
  final String id;
  final String name;
  final int humidityLevel;
  final int waterLevel;
  bool motorStatus;
  final String email;
  final DateTime createdAt;

  Sensor(
      {required this.id,
      required this.name,
      required this.humidityLevel,
      required this.waterLevel,
      required this.motorStatus,
      required this.email,
      required this.createdAt});

  factory Sensor.fromJson(Map<String, dynamic> json) {
    return Sensor(
      id: json['_id'] ?? '',
      name: json['name'] ?? 'Nom invalide',
      humidityLevel: json['humidityLevel'] ?? 0,
      waterLevel: json['waterLevel'] ?? 0,
      motorStatus: json['motorStatus'] ?? false,
      email: json['email'] ?? '',
      createdAt: DateTime.parse(json['createdAt'] ?? DateTime.now().toString()),
    );
  }

  @override
  List<Object?> get props => [id];
}
