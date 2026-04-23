import Foundation
import WidgetKit

@objc(WidgetBridge)
class WidgetBridge: NSObject {

  @objc
  func sendTextToWidget(_ text: String) {
    let defaults = UserDefaults(suiteName: "group.org.reactjs.native.example.yourapp")  // <-- your group
    defaults?.set(text, forKey: "widgetText")

    // Reload widget
    if #available(iOS 14.0, *) {
        WidgetCenter.shared.reloadAllTimelines()
    }
  }
}