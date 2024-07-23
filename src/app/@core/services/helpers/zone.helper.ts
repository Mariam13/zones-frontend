export class ZoneHelper {
  public zonePointColors: string[] = ['#ed226e', '#56b85c', '#485bbd', '#fda302'];

  public getPointsForPolygon(points: number[][]): string {
    return points.map(p => p.join(',')).join(' ');
  }
}
