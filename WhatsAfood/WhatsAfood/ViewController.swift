//
//  ViewController.swift
//  WhatsAfood
//
//  Created by yu xu on 5/27/18.
//  Copyright © 2018 yu xu. All rights reserved.
//

import UIKit
import CoreML
import Vision
import SVProgressHUD

class ViewController: UIViewController, UIImagePickerControllerDelegate, UINavigationControllerDelegate{

    @IBOutlet weak var imageView_Camera: UIImageView!
    
    let imagePicker = UIImagePickerController()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        imagePicker.delegate = self
        imagePicker.sourceType = .camera
        imagePicker.allowsEditing = false
    }
    func imagePickerControllerDidCancel(_ picker: UIImagePickerController) {
        viewWillAppear(true)
    }
    func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [String : Any]) {
        
        if let image = info[UIImagePickerControllerOriginalImage] as? UIImage {
            imageView_Camera.image = image
            SVProgressHUD.show()
            guard let ciimage = CIImage(image: image) else {
                fatalError("error at converting uiimage to ciimage")
            }
            detect(ciimage)
        }
        SVProgressHUD.dismiss()
        picker.dismiss(animated: true, completion: nil)
        
    }

    @IBAction func cameraTapped(_ sender: UIBarButtonItem) {
        present(imagePicker, animated: true, completion: nil)
    }
    
    func detect(_ image: CIImage){
        guard let model = try? VNCoreMLModel(for: Inceptionv3().model) else{
            fatalError("error at retrieving ML model")
        }
        let requests = VNCoreMLRequest(model: model) { (request, error) in
            guard let results = request.results as? [VNClassificationObservation] else{
                fatalError("error at retrieving observation results")
            }
            guard let firstResult = results.first else{
                fatalError("no result was found")
            }
            let item = firstResult.identifier
            self.navigationItem.title = item
        }
        let handler = VNImageRequestHandler(ciImage: image)
        do{
            try handler.perform([requests])
        }catch{
            print("error at processing: \(error)")
        }
        
    }
    
}

