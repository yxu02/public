//
//  ViewController.swift
//  FlowerDx
//
//  Created by yu xu on 5/28/18.
//  Copyright © 2018 yu xu. All rights reserved.
//

import UIKit
import CoreML
import Vision
import Alamofire
import SwiftyJSON
import SVProgressHUD
import SDWebImage

class ViewController: UIViewController, UINavigationControllerDelegate, UIImagePickerControllerDelegate {

    @IBOutlet weak var cameraButton: UIBarButtonItem!
    @IBOutlet weak var imageView: UIImageView!
    @IBOutlet weak var textLabel: UILabel!
    let imagePicker = UIImagePickerController()
    let WIKI_API = "https://en.wikipedia.org/w/api.php"
    override func viewDidLoad() {
        super.viewDidLoad()
        imagePicker.delegate = self
        imagePicker.allowsEditing = true
        imagePicker.sourceType = .camera
    }

    @IBAction func cameraTapped(_ sender: UIBarButtonItem) {
        present(imagePicker, animated: true, completion: nil)
    }
    
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        SVProgressHUD.show()
        cameraButton.isEnabled = false
        guard let image = info[UIImagePickerControllerEditedImage] as? UIImage else{
            fatalError("Error at getting UI image")
        }
//        imageView.image = image
        guard let ciimage = CIImage(image: image) else{
            fatalError("Error at getting CIImage")
        }
        
        detect(image: ciimage)
        imagePicker.dismiss(animated: true, completion: nil)
    }
    
    func detect(image: CIImage){
        guard let model = try? VNCoreMLModel(for: FlowerClassifier().model) else{
            fatalError("Error at retrieving ML model")
        }
        
        let request = VNCoreMLRequest(model: model) { (request, error) in
            
            guard let results = request.results as? [VNClassificationObservation] else{
                fatalError("Error at retrieving model result")
            }
            guard let firstResult = results.first else{
                fatalError("no result was found")
            }
            let item = firstResult.identifier
            self.navigationItem.title = item
            
            DispatchQueue.main.async {
                self.cameraButton.isEnabled = true
                SVProgressHUD.dismiss()
            }
            self.callWikiAPI(mlResultName: item)
        }
        let handler = VNImageRequestHandler(ciImage: image)
        do{
            try handler.perform([request])
        }catch{
            print("Error at handling image process request with the error: \(error)")
        }
    }
    
    func callWikiAPI(mlResultName : String){
        let params: [String: String] = [
            "format" : "json",
            "action" : "query",
            "prop" : "extracts|pageimages",
            "exintro" : "",
            "explaintext" : "",
            "titles" : mlResultName,
            "indexpageids" : "",
            "redirects" : "1",
            "pithumbsize" : "500"
        ]
        Alamofire.request(WIKI_API, method: .get, parameters: params).responseJSON {
            (response) in
            if response.result.isSuccess{
                let wikiJSON: JSON = JSON(response.result.value!)
                print(wikiJSON)
                self.updateWikiResult(wikiJSON)
            }
            if response.result.isFailure{
                print("Error: \(String(describing: response.result.error))")
            }
        }
    }
    
    func updateWikiResult(_ json: JSON){
        
        if let pageId = json["query"]["pageids"][0].string {
            textLabel.text = json["query"]["pages"][pageId]["extract"].stringValue
            let wikiImageURL = json["query"]["pages"][pageId]["thumbnail"]["source"].stringValue
            imageView.sd_setImage(with: URL(string: wikiImageURL), completed: nil)
        } else{
            textLabel.text = "Server Error!"
        }
    }
}

