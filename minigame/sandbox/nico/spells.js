var spells=new Array();
spells["D�tection de la magie"]={"category":"standard","level":"0","name":"D�tection de la magie","playerClass":"Magicien / Pr�tre","portee":"18 m�tres","duree":"1minute/niveau","description":"Vous rep�rez les objets magiques et les sorts et vous pouvez identifier un objet magique. Vous sentez s'il y a un �l�ment magique � port�e d�s le round o� vous lancez ce sort. Au deuxi�me round, vous savez combien il y en a et au troisi�me, vous savez pr�cis�ment quels sont les �l�ments magiques. Si vous lancez ce sort sur un objet magique, vous d�couvrez ses pouvoirs."};
spells["Manipulation � distance"]={"level":"0","category":"standard","name":"Manipulation � distance","playerClass":"Magicien","portee":"9 m�tres","duree":"concentration","description":"Vous pouvez soulevzr un objet et le d�placer de loin sur une distance de 4,50 m�tres dans n'importe quelle direction, en pointant le doigt vers lui. Si vous essayez d'aller au del� de cette port�e, le sort se termine. Vous ne pouvez pas utiliser ce sort pour d�placer un objet port�e ou tenu par une autre cr�atue."};
spells["Lecture de la magie"]={"category":"standard","level":"0","name":"Lecture de la magie","playerClass":"Magicien / Pr�tre","portee":"personnelle","duree":"10 minutes/niveau","description":"Vous parvenez � lire un parchemin ou un autre �crit magique. Si vous utilisez ce sort sur un parchemin magique o� est inscrit un sort de magicien, vous pouvez lancer ce sort, comme si vous l'aviez pr�par�. le MJ en sait plus sur les parchemins magiques."};
spells["Rayon de givre"]={"level":"0","category":"ennemy","name":"Rayon de givre","playerClass":"Magicien","portee":"9 m�tres","duree":"instantan�e","description":"Un rayon de givre jaillit de votre doigt. Faites un jet d'attaque de contact � distance (voir page 58). Si vous touchez votre cible,elle subit 1D3 points de d�gats de froit ( lancez un 1D6 sur 1-2, elle subit un point de d�g�ts, si vous faites 3-4 elle re�oit 2 point et si vous faites 5-6 elle re�oit 3 points)."};
spells["Alarme"]={"category":"standard","level":"1","name":"Alarme","playerClass":"Magicien","portee":"3 m�tres","duree":"2h / niveau","description":"Zone d&#39;effet �manation de 6 m de rayon autour du point choisi<br/><br/>Jet de sauvegarde aucun ; R�sistance � la magie non<br/><br/>Choisissez une zone de 6 m�tres de rayon, comme un campement. Si une cr�ature autre que vous ou vos alli�s y p�n�tre, une alarme retentit bruyamment et r�veille tous le monde. Les cr�atures invisibles ou discr�tes d�clenchent aussi l&#39;alarme."};
spells["Armure de mage"]={"category":"friendly","level":"1","name":"Armure de mage","playerClass":"Magicien","portee":"contact","duree":"1h / niveau","description":"Vous touchez un alli� qui gagne un bonus de +4 � la CA. S'il porte d�j� une armure, il utilise le meilleur bonus: celui du sort ou de l'armure."};
spells["R�sistance"]={"category":"friendly","level":"0","name":"R�sistance","playerClass":"Magicien / Pr�tre","portee":"contact","duree":"1 minute","description":"Cible cr�ature touch�e<br/><br/>Jet de sauvegarde Volont�, annule (inoffensif) ; R�sistance � la magie oui (inoffensif)<br/><br/>Ce sort prot�ge la cible en lui offrant temporairement un bonus de r�sistance de +1 aux jets de sauvegarde. (Peut �tre associ� au sort \"Permanence\")."};
spells["D�tection du poison"]={"category":"standard","level":"0","name":"D�tection du poison","playerClass":"Magicien / Pr�tre","portee":"courte (7.5m + 1.5/2 niveaux)","duree":"instantan�e","description":"Ce sort indique si une cr�ature, un objet ou un lieu a �t� empoisonn� ou est toxique. Un test de Sagesse de DD20 permet de d�terminer la nature exacte du poison. Si le lanceur de sorts ma�trise la comp�tence Artisanat (alchimie), il peut tenter un test d'Artisanat (alchimie) de DD20 si le test de Sagesse Echoue; il peut �galement choisir de r�aliser ce test d'Artisanat (alchimie) aant le test de Sagesse. Le sort fonctionne � travers les barri�res si celles-ci ne sont pas trop �paisses : il est bloqu� par 30cm de pierre, 2.5 de m�tal, une mince feuille de plomb ou 90cm de bois ou de terre."};
spells["H�b�tement"]={"category":"ennemy","level":"0","name":"H�b�tement","playerClass":"Magicien","portee":"courte (7.5m + 1.5/2 niveaux)","duree":"1 round","description":"Ce sort embue l�esprit d�un humano�de poss�dant 4 DV ou moins, ce qui l�emp�che d�entreprendre la moindre action. Les humano�des ayant au moins 5 DV sont immunis�s aux effets d�h�b�tement. La victime est h�b�t�e mais pas �tourdie, de sorte que ses adversaires ne b�n�ficient d�aucun avantage lorsqu�ils s�en prennent � elle. Si une cr�ature a �t� h�b�t�e par ce sort, elle ne peut plus �tre affect�e par celui-ci pendant une minute."};
spells["Illumination"]={"category":"ennemy","level":"0","name":"Illumination","playerClass":"Magicien","portee":"courte (7.5m + 1.5/2 niveaux)","duree":"instantan�e","description":"Ce sort �l�mentaire cr�e une petite explosion de lumi�re. Si celle-ci se produit devant une seule cr�ature, cette derni�re doit r�ussir un jet de Vigueur pour �viter de se retrouver �blouie pendant une minute. Les cr�atures aveugles, ainsi que celles qui sont d�j� �blouies, ne sont pas affect�es par illumination."};
spells["�tincelle"]={"category":"standard","level":"0","name":"�tincelle","playerClass":"Magicien / Pr�tre","portee":"courte (7.5m + 1.5/2 niveaux)","duree":"instantan�e","description":"Le personnage peut embraser un objet inflammable de taille infime. Ce sort fonctionne comme un silex et de l'amadou sauf que l'on peut l'utiliser quelles que soient les conditions m�t�orologiques et qu'il met moins longtemps � enflammer l'objet."};
spells["Lumi�re"]={"category":"standard","level":"0","name":"Lumi�re","playerClass":"Magicien / Pr�tre","portee":"contact","duree":"10 minutes/niveau","description":"Lanc� sur un objet, ce sort le fait briller comme la lumi�re d�une torche, ce qui lui permet d��clairer jusqu�� six m�tres (4 cases) � la ronde tout en augmentant la luminosit� d�un cran dans un rayon de six m�tres (4 cases) de plus (les t�n�bres se muent en faible lumi�re et cette derni�re en lumi�re normale). Ce sort n�a aucun effet dans une zone de lumi�re normale ou de vive lumi�re. L�effet est immobile, mais on peut le jeter sur un objet mobile.<br/><br/>Le personnage ne peut activer qu�un sort de lumi�re � la fois. S�il en lance un alors qu�un ancien est encore actif, l�ancien sort se dissipe. Si le personnage rend ce sort permanent (� l�aide de permanence ou d�un effet similaire) le sort permanent ne compte pas. Tous les sorts de lumi�re contrent et dissipent les sorts d�obscurit� de niveau inf�rieur ou �gal."};
spells["Lumi�res dansantes"]={"category":"standard","level":"0","name":"Lumi�res dansantes","playerClass":"Magicien","portee":" moyenne (30 m + 3 m/niveau)","duree":"1 minute","description":"Ce sort fait appara�tre, au choix, jusqu�� quatre lumi�res ressemblant � des torches ou des lanternes (dont l��clairage est �quivalent), jusqu�� quatre globes lumineux semblables � des feux follets, ou une silhouette lumineuse vaguement humano�de. Quand ce sort est lanc� plusieurs fois, les lumi�res dansantes doivent rester � trois m�tres (2 cases) ou moins les unes des autres. Mis � part cela, elles se d�placent en fonction des d�sirs du lanceur de sort, sans que ce dernier ait besoin de se concentrer : elles peuvent donc avancer, reculer, monter, descendre, tourner � l�angle des couloirs, etc. Elles peuvent se d�placer de 30 m (20 cases) par round. Les lumi�res dansantes qui vont au-del� des limites de port�e du sort (par rapport au personnage, pas au point o� le sort a �t� lanc�) dispara�t aussit�t.\n\nLe personnage ne peut activer qu�un sort de ce type � la fois. S�il en lance un alors qu�un ancien est encore actif, l�ancien sort se dissipe. En revanche, si un sort de lumi�res dansantes devient permanent, il ne compte plus.Il est possible d�user de permanence sur un sort de lumi�res dansantes."};
spells["Son imaginaire"]={"category":"standard","level":"0","name":"Son imaginaire","playerClass":"Magicien","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"1 round/niveau","description":"Ce sort permet de cr�er un son d�intensit� stable ou changeante (qui monte, qui descend, qui se rapproche, etc.). Le personnage choisit le type de bruit qu�il souhaite obtenir au cours de l�incantation et ne peut plus le modifier par la suite.\n\nLe volume du son d�pend du niveau du personnage, qui peut faire autant de bruit que quatre humains normaux par niveau de lanceur de sorts (jusqu�� un maximum de quarante humains). Le personnage peut faire croire que des gens chantent ou crient non loin, qu�ils marchent, qu�ils courent, etc. Le son g�n�r� peut prendre n�importe quelle forme, du moment qu�il ne d�passe pas les limites de volume impos�es. Une horde de rats qui courent et piaillent fait autant de bruit que huit humains qui se livrent au m�me exercice. Le rugissement d�un lion fait autant de bruit que seize humains, alors que le rugissement d�un dragon vaut trente-deux humains.\n\nToute personne qui entend un son imaginaire a droit � un jet de Volont� pour d�voiler la supercherie.\n\n� noter que son imaginaire permet d�augmenter fortement l�efficacit� d�image silencieuse.\n\nOn peut rendre le son imaginaire permanent � l�aide d�un sort de permanence."};
spells["Aspersion acide"]={"category":"ennemy","level":"0","name":"Aspersion acide","playerClass":"Magicien","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"instantan�e","description":"Le jeteur de sort lance un petit orbe en direction de la cible. Il doit effectuer une attaque de contact � distance pour toucher cette derni�re. L�orbe inflige alors 1d3 points de d�g�ts d�acide. Cet acide dispara�t au bout d�un round."};
spells["Destruction de mort-vivant"]={"category":"ennemy","level":"0","name":"Destruction de mort-vivant","playerClass":"Magicien","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"instantan�e","description":"Ce sort cr�e un rayon d��nergie positive. Le personnage doit r�ussir une attaque de contact � distance pour atteindre le mort-vivant. Si l�attaque touche, le mort-vivant subit 1d6 points de d�g�ts."};
spells["Fatigue"]={"category":"ennemy","level":"0","name":"Fatigue","playerClass":"Magicien","portee":" contact","duree":"1 round/niveau","description":"D�un simple toucher, le lanceur de sorts peut fatiguer la cible en lui infligeant une d�charge d��nergie n�gative. Il doit effectuer une attaque de contact pour toucher sa victime. Celle-ci est alors fatigu�e pendant toute la dur�e du sort.\n\nFatigue n�a aucun effet si la cible est d�j� fatigu�e. Contrairement � la fatigue normale, l�effet prend fin au terme de la dur�e du sort."};
spells["Saignement"]={"category":"ennemy","level":"0","name":"Saignement","playerClass":"Magicien / Pr�tre","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"instantan�e","description":"Cible une cr�ature vivante<br/><br/>Jet de sauvegarde Volont�, annule ; R�sistance � la magie oui<br/><br/>� cause du personnage, une cr�ature qui se trouvait sous 0 points de vie mais s��tait stabilis�e recommence � agoniser. Le lanceur de sorts vise une cr�ature qui poss�de -1 point de vie ou moins. Celle-ci perd alors un point de vie par round. On peut la stabiliser ensuite normalement mais le sort fait perdre 1 point de vie � toute cr�ature mourante."};
spells["Message"]={"category":"friendly","level":"0","name":"Message","playerClass":"Magicien","portee":"moyenne (30 m + 3 m/niveau)","duree":"10 minutes/niveau","description":"Cette incantation permet de chuchoter des messages. Les personnes alentour discernent le message si elles r�ussissent un test de Perception DD 25. Le personnage commence par indiquer du doigt toutes les cr�atures � inclure dans le sort. Par la suite, d�s qu�il murmure, le message est entendu par tous les destinataires d�sign�s, � condition qu�ils se trouvent dans les limites de port�e. L�effet du sort est bloqu� par un silence d�origine magique, 30 cm de pierre, 2,5 cm de m�tal, une feuille de plomb, ou 90 cm de bois ou de terre. Le message n�a pas besoin de se d�placer en ligne droite. Il peut contourner un obstacle physique, � condition que le chemin qu�il emprunte reste � l�int�rieur des limites de port�e. Les cr�atures recevant le message peuvent � leur tour chuchoter une r�ponse, que le personnage entend. Le sort transmet les sons, pas le sens ; il ne permet donc pas de franchir la barri�re du langage. Pour �noncer un message, il est n�cessaire de le prononcer tr�s bas."};
spells["Ouverture/fermeture"]={"category":"standard","level":"0","name":"Ouverture/fermeture","playerClass":"Magicien","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":" instantan�e","description":"Ce sort permet, au choix, d�ouvrir ou de fermer une porte, un coffre, une bo�te, une fen�tre, un sac, une bourse, une bouteille ou tout autre r�cipient. Il �choue automatiquement si l�objet dispose d�un m�canisme de fermeture (barre, serrure ferm�e, etc.). De plus, il ouvre et ferme seulement les objets qui p�sent 15 kg ou moins. Le couvercle d�un gros coffre ou une porte de grande taille repr�sentent des masses trop importantes pour lui."};
spells["R�paration"]={"category":"standard","level":"0","name":"R�paration","playerClass":"Magicien / Pr�tre","portee":"3 m","duree":" instantan�e","description":"Cible 1 objet pesant jusqu�� 500 g/niveau<br/><br/>Jet de sauvegarde Volont�, annule (inoffensif, objet) ; R�sistance � la magie oui (inoffensif, objet)<br/><br/>Ce sort permet de r�parer les dommages superficiels caus�s aux objets et leur rend 1d4 points de vie. Dans le cas d�un objet cass�, l�objet n�est plus affect� par cette condition n�faste si l�objet se retrouve � 50% de ses points de vie ou moins. Pour que ce sort fonctionne, le personnage doit disposer de tous les morceaux de l�objet. Le personnage peut utiliser ce sort pour r�parer un objet magique cass� � condition que son niveau de lanceur de sorts soit �gal ou sup�rieur � celui de l�objet. Il peut aussi r�parer un objet magique d�truit (� 0 point de vie ou moins) mais le sort ne lui rend pas ses aptitudes magiques. Ce sort n�affecte pas les cr�atures (pas m�me les cr�atures artificielles). Ce sort n�a aucun effet sur les objets pervertis ou transmut�s mais il peut r�parer les d�g�ts qu�ils ont subis."};
spells["Prestidigitation"]={"category":"standard","level":"0","name":"Prestidigitation","playerClass":"Magicien","portee":"3 m","duree":"1 heure","description":"Ce terme regroupe toute une s�rie de tours de magie mineurs que les novices lancent pour s�entra�ner. Une fois l�incantation achev�e, ces sorts permettent de g�n�rer des effets magiques tr�s simples et tr�s limit�s pendant une heure. Par exemple, le personnage peut, une fois par round, soulever tr�s lentement un objet ne pesant pas plus de cinq cents grammes, colorier, nettoyer ou salir un objet ne faisant pas plus de trente centim�tres de c�t�, mais aussi chauffer, refroidir ou donner du go�t � cinq cents grammes de mati�re inerte. Ces tours sont trop anodins pour blesser qui que ce soit, ou m�me pour troubler la concentration d�un autre jeteur de sorts. Ils permettent aussi de cr�er de petits objets mais ceux-ci ont toujours l�air grossiers et artificiels. Les objets cr��s par prestidigitation sont trop fragiles pour servir d�armes, d�outils ou de composantes mat�rielles pour d�autres sorts. Enfin, ces tours mineurs ne sont pas assez puissants pour reproduire les effets d�autres sorts. Tout changement d��tat qu�ils apportent (mis � part le fait de d�placer un objet, de le salir ou de le nettoyer) dure une heure tout au plus."};
spells["Signature magique"]={"category":"standard","level":"0","name":"Signature magique","playerClass":"Magicien","portee":" contact","duree":"permanente","description":"Ce sort permet au personnage d�apposer sa signature ou sa marque personnelle, qui ne peut comprendre plus de six caract�res distincts. Ce symbole peut �tre visible ou non. La rune s�inscrit dans n�importe quel mat�riau sans ab�mer l�objet sur lequel elle est plac�e. Si la marque est invisible, d�tection de la magie l�entoure d�une aura qui la rend visible (mais elle n�en devient pas forc�ment compr�hensible pour autant).\n\nD�tection de l�invisibilit�, vision lucide, une gemme de vision ou une robe de vision totale permettent aussi de rep�rer une rune invisible. Lecture de la magie r�v�le les mots contenus dans la signature, le cas �ch�ant. Rien ne permet de dissiper la rune, qui peut �tre effac�e normalement par son cr�ateur ou gr�ce au sort effacement.\n\nSi on la trace sur un �tre vivant, la rune s�efface peu � peu et dispara�t au bout d�un mois environ.\n\nIl faut apposer sa signature magique sur un objet avant de lancer invocation instantan�e dessus (voir la description de ce sort pour plus de d�tails)."};
spells["Assistance divine"]={"category":"friendly","level":"0","name":"Assistance divine","playerClass":"Pr�tre","portee":"contact","duree":"1 minute ou jusqu�� utilisation","description":"Ce sort fournit � la cr�ature une assistance divine momentan�e, se traduisant par un bonus d�aptitude de +1 sur un jet d�attaque, un jet de sauvegarde ou un test de comp�tence. La cible doit choisir d�utiliser ou non son bonus avant de jeter le d�."};
spells["Cr�ation d&#39;eau"]={"category":"friendly","level":"0","name":"Cr�ation d&#39;eau","playerClass":"Pr�tre","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"courte (7,50 m + 1,50 m/2 niveaux)","description":"Effet jusqu�� 8 litres d�eau/niveau<br/><br/>Jet de sauvegarde aucun ; R�sistance � la magie non<br/><br/>Ce sort donne naissance une eau pure et potable, semblable � l�eau de pluie. Elle appara�t dans n�importe quel r�cipient capable de l�accueillir, ou au-dessus d�une zone trois fois plus large (ce qui permet de cr�er une fine pluie ou de remplir plusieurs r�cipients de taille moindre). L�eau non-consomm�e dispara�t au bout d�une journ�e.<br/><br/>Note. Les sorts d�Invocation ne peuvent pas faire appara�tre de substance ou d�objet � l�int�rieur d�une cr�ature. L�eau p�se 1 kg par litre. Un m�tre cube d�eau contient environ mille litres et p�se une tonne."};
spells["Purification de nourriture et d'eau"]={"category":"standard","level":"0","name":"Purification de nourriture et d'eau","playerClass":"Pr�tre","portee":"3 m","duree":"instantan�e","description":"Cible 30 dm�/niveau d�eau et de nourriture impropres � la consommation<br/><br/>Jet de sauvegarde Volont�, annule (objet) ; R�sistance � la magie oui (objet)<br/><br/>Ce sort transforme la nourriture avari�e et l�eau croupie en denr�es saines mais il ne les emp�che pas de pourrir � nouveau. La purification de nourriture et d�eau annule les pouvoirs de l�eau maudite et des breuvages ou aliments similaires. En revanche, le sort reste sans effet sur les potions magiques et les cr�atures, quelles qu�elles soient."};
spells["Stabilisation"]={"category":"friendly","level":"0","name":"Stabilisation","playerClass":"Pr�tre","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"instantan�e","description":"Effet une cr�ature vivante<br/><br/>Jet de sauvegarde Volont�, annule (inoffensif) ; R�sistance � la magie oui (inoffensif)<br/><br/>Quand le personnage lance ce sort, il vise une cr�ature ayant -1 point de vie ou moins. Cette cr�ature se stabilise alors automatiquement et ne perd pas d�autres points de vie. Si, par la suite, elle re�oit de nouveaux d�g�ts, elle agonise de nouveau."};
spells["Stimulant"]={"category":"friendly","level":"0","name":"Stimulant","playerClass":"Pr�tre","portee":"courte (7,50 m + 1,50 m/2 niveaux)","duree":"1 minute","description":"Cible cr�ature touch�e<br/><br/>Jet de sauvegarde Vigueur, annule (inoffensif) ; R�sistance � la magie oui (inoffensif)<br/><br/>La cible gagne 1 point de vie temporaire."};
spells["Bouclier"]={"category":"friendly","level":"1","name":"Bouclier","playerClass":"Magicien","portee":"personnelle","duree":"1 minute/niveau","description":"Cible le jeteur de sorts<br/><br/>Bouclier produit un disque de force mobile flottant devant son cr�ateur, qui absorbe les projectiles magiques prenant ce dernier pour cible. Il fournit �galement un bonus de bouclier de +4 � la CA. S�agissant d�un effet de force, ce bonus agit face aux attaques de contact � distance intangibles. Il ne pr�sente ni malus d�armure aux tests ni risque d��chec des sorts profanes."};
spells["Endurance aux �nergies destructives"]={"category":"friendly","level":"1","name":"Endurance aux �nergies destructives","playerClass":"Magicien","portee":"contact","duree":"24 heures","description":"Cible cr�ature touch�e<br/><br/>Jet de sauvegarde Volont�, annule (inoffensif) ; R�sistance � la magie oui (inoffensif)<br/><br/>Une cr�ature prot�g�e par endurance aux �nergies destructives ne souffre pas de la chaleur ou du froid lorsqu�elle se trouve dans un environnement extr�me. Elle se sent � son aise par des temp�ratures allant de -45�C � +60�C et ne doit pas effectuer le moindre jet de Vigueur dans ces conditions. Son �quipement b�n�ficie �galement de la m�me protection.<br/><br/>Endurance aux �nergies destructives n�offre aucune protection contre les d�g�ts de feu et de froid ni contre les autres dangers li�s � l�environnement comme la fum�e ou le manque d�air par exemple."};
spells["Protection contre la Loi"]={"category":"friendly","level":"1","name":"Protection contre la Loi","playerClass":"Magicien","portee":"contact","duree":"1 minute/niveau","description":"Ce sort ressemble � protection contre le Mal mais les bonus de parade et de r�sistance s�appliquent aux attaques port�es par les cr�atures Loyales et les cr�atures convoqu�es d�alignement Loyal ne peuvent pas toucher le b�n�ficiaire."};
spells["Protection contre le Bien"]={"category":"friendly","level":"1","name":"Protection contre le Bien","playerClass":"Magicien","portee":"contact","duree":"1 minute/niveau","description":"Ce sort est semblable � protection contre le Mal mais les bonus de parade et de r�sistance s�appliquent aux attaques port�es par les cr�atures Bonnes et les cr�atures convoqu�es d�alignement Bon ne peuvent pas toucher le b�n�ficiaire."};
spells["Protection contre le Chaos"]={"category":"friendly","level":"1","name":"Protection contre le Chaos","playerClass":"Magicien","portee":"contact","duree":"1 minute/niveau","description":"Ce sort est semblable � protection contre le Mal mais les bonus de parade et de r�sistance s�appliquent aux attaques d�livr�es par les cr�atures Chaotiques et les cr�atures convoqu�es d�alignement Chaotique ne peuvent pas toucher le b�n�ficiaire."};
spells["Protection contre le Mal"]={"category":"friendly","level":"1","name":"Protection contre le Mal","playerClass":"Magicien","portee":"contact","duree":"1 minute/niveau","description":"Cible cr�ature touch�e<br/><br/>Jet de sauvegarde Volont�, annule (inoffensif) ; R�sistance � la magie non (voir description)<br/><br/>Ce sort prot�ge son b�n�ficiaire contre les attaques des cr�atures d�alignement Mauvais, mais aussi contre le contr�le mental et les cr�atures convoqu�es. Il cr�e une barri�re magique � trente centim�tres autour du sujet. Cette barri�re se d�place avec le personnage et poss�de trois effets principaux :<br/><br/>Premi�rement, le personnage b�n�ficie d�un bonus de parade de +2 � la CA et d�un bonus de r�sistance de +2 aux jets de sauvegarde. Ces deux bonus s�appliquent uniquement contre les attaques port�es par les cr�atures mal�fiques.<br/><br/>Deuxi�mement, la cible peut imm�diatement effectuer un nouveau jet de sauvegarde contre tous les sorts et les effets de possession ou de contr�le mental qui l&#39;affectent (et qui autorisent un jet de sauvegarde). Parmi ces effets pour lesquels la cible b�n�ficie d&#39;un nouveau jet de sauvegarde, on trouve les effets d&#39;enchantement (charme) et d&#39;enchantement (coercition). Ces nouveaux jets de sauvegarde sont effectu�s avec un bonus de moral de +2 contre le DD du premier jet de sauvegarde. En cas de r�ussite, les effets en question sont supprim�s pendant toute la dur�e de la protection contre le Mal mais ils reprennent cours d�s que la protection expire. Tant que la cible est affect�e par la protection contre le Mal, elle est immunis�e contre toutes les nouvelles tentatives de la poss�der ou d&#39;exercer un contr�le mental sur elle. Le sort n&#39;expulse pas les forces � l&#39;origine de ce contr�le (comme un fant�me ou un lanceur de sort lan�ant possession) mais il les emp�che de contr�ler la cible. Ce second effet ne fonctionne que contre les sorts et les effets cr��s par des objets ou des cr�atures mal�fiques (� l�appr�ciation du MJ).<br/><br/>Enfin, le sort emp�che les cr�atures convoqu�es de toucher le personnage. Les attaques naturelles de ces cr�atures �chouent automatiquement et elles sont oblig�es de reculer si leurs attaques les obligent � toucher l�individu prot�g�. Les cr�atures d�alignement autre que Mauvais sont immunis�es contre cet effet du sort. La protection contre les cr�atures convoqu�es s�ach�ve instantan�ment si le sujet attaque l�entit� ou tente de la repousser � l�aide de la barri�re. Enfin, la r�sistance � la magie peut permettre � une cr�ature de toucher le personnage."};
spells["Verrouillage"]={"category":"friendly","level":"1","name":"Verrouillage","playerClass":"Magicien","portee":"moyenne (30 m + 3 m/niveau)","duree":"1 minute/niveau","description":"Cibles 1 porte dans la limite de 2 m�/niveau<br/><br/>Jet de sauvegarde aucun ; R�sistance � la magie non<br/><br/>Ce sort verrouille une porte, une fen�tre, un portail, des volets ou une herse de bois, de m�tal ou de pierre. Verrouillage emp�che d�ouvrir l�objet prot�g� comme si ce dernier �tait ferm� par un v�ritable cadenas. D�blocage ou dissipation de la magie dissipe le verrouillage. Un personnage qui souhaite enfoncer une porte ou autre prot�g�e par ce sort voit le DD de son test de Force augment� de 5 points."};
spells["Compr�hension des langages"]={"category":"friendly","level":"1","name":"Compr�hension des langages","playerClass":"Magicien","portee":"personnelle","duree":"10 minutes/niveau","description":"Cible le jeteur de sorts<br/><br/>Ce sort permet de comprendre la langue des autres cr�atures et de d�chiffrer des textes qui resteraient sinon incompr�hensibles. Notez que le fait de savoir lire un passage n�implique pas forcement qu�on en saisisse la teneur, et que le sort ne fonctionne que dans un seul sens : il ne permet nullement de parler ou d��crire le langage qu�il traduit.<br/><br/>On peut lire un texte � la vitesse d�une page (deux cent cinquante mots) par minute. Si l��crit est magique, compr�hension des langages le r�v�le, mais sans rendre les mots lisibles. Le sort est notamment propice pour les d�chiffrages de cartes au tr�sor. Il peut �tre tromp� par certaines protections magiques (telles que page secr�te et texte illusoire) et ne permet pas de d�crypter les codes ou de d�celer les messages secrets cach�s dans des textes anodins.<br/><br/>On peut utiliser permanence sur compr�hension des langages."};
spells["Coup au but"]={"category":"friendly","level":"1","name":"Coup au but","playerClass":"Magicien","portee":"personnelle","duree":"voir description","description":"Cible le jeteur de sorts<br/><br/>Le personnage jetant ce sort sait intuitivement comment frapper pour que son attaque soit la plus efficace possible. Son prochain jet d�attaque (qui doit avoir lieu au plus tard le round suivant l�incantation) gagne un bonus d�intuition de +20. De plus, il n�a aucune chance de manquer une cible camoufl�e."};
spells["D�tection des morts-vivants"]={"category":"friendly","level":"1","name":"D�tection des morts-vivants","playerClass":"Magicien","portee":"18 m","duree":"concentration, jusqu�� 1 minute/niveau","description":"Zone d&#39;effet �manation en forme de c�ne<br/><br/>Jet de sauvegarde aucun ; R�sistance � la magie non<br/><br/>Gr�ce � d�tection des morts-vivants, le lanceur de sorts peut d�tecter les auras sp�cifiques des morts-vivants. Les informations qu�il re�oit d�pendent du temps pass� � �tudier la zone d�effet :<br/><br/>Premier round : pr�sence ou absence d�auras de morts-vivants.<br/><br/>Deuxi�me round : nombre d�auras de morts-vivants dans la zone �tudi�e et intensit� de l�aura la plus puissante. Si le lanceur de sorts est d�alignement Bon, si l�aura rep�r�e est surpuissante (voir ci-dessous) et si la cr�ature d�tect�e poss�de un nombre de DV sup�rieur ou �gal au double du niveau du lanceur de sorts, celui-ci est �tourdi pendant 1 round et le sort prend fin imm�diatement.<br/><br/>Troisi�me round : intensit� et emplacement de chacune des auras. Si une aura se trouve en-dehors du champ de vision du lanceur de sorts, il apprend la direction dans laquelle elle se trouve mais pas son emplacement exact.<br/><br/>Intensit� de l�aura. La puissance de l�aura d�pend du nombre de DV du mort-vivant dont elle �mane :<br/><br/>DV du mort-vivant\tIntensit� de l�aura\tPersistance<br/>1 ou moins\t\tFaible\t\t\t1d6 rounds<br/>2�4\t\t\t\tMod�r�e\t\t\t1d6 minutes<br/>5�10\t\t\t\tPuissante\t\t\t1d6x10 minutes<br/>11 ou plus\t\t\tSurpuissante\t\t1d6 jours<br/><br/><br/>Aura persistante. L�aura de mort-vivant ne dispara�t pas imm�diatement lorsque sa source est d�truite. Un sort de d�tection des morts-vivants ciblant la zone en question r�v�le une aura t�nue (moins puissante qu�une aura faible). Le temps pendant lequel l�aura persiste d�pend de la puissance du mort-vivant, comme indiqu� sur la table ci-dessus.<br/><br/>Le personnage peut pivoter sur lui-m�me pour examiner une nouvelle zone chaque round. Le sort fonctionne � travers les barri�res si celles-ci ne sont pas trop �paisses : il est bloqu� par 30 cm de pierre, 2,5 cm de m�tal, une mince feuille de plomb ou 90 cm de bois ou de terre."};
spells["D�tection des passages secrets"]={"category":"friendly","level":"1","name":"D�tection des passages secrets","playerClass":"Magicien","portee":"18 m","duree":"concentration, jusqu�� 1 minute/niveau","description":"Zone d&#39;effet �manation en forme de c�ne<br/><br/>Jet de sauvegarde aucun ; R�sistance � la magie non<br/><br/>Gr�ce � d�tection des passages secrets, le lanceur de sorts peut rep�rer les passages secrets, les caches et les compartiments secrets. Seuls les passages, les portes ou les ouvertures sp�cialement con�us pour ne pas �tre remarqu�s sont r�v�l�s par ce sort. Les informations obtenues d�pendent du temps pass� � �tudier la zone observ�e :<br/><br/>Premier round : pr�sence ou absence de passages secrets.<br/><br/>Deuxi�me round : nombre de passages secrets et leur emplacement. Si un d�eux se situe hors du champ de vision du lanceur de sorts, celui-ci sait dans quelle direction il se trouve mais ne conna�t pas son emplacement exact.<br/><br/>Chaque round suppl�mentaire : m�canisme d�ouverture d�un passage secret sp�cifique examin� par le lanceur de sorts.<br/><br/>Chaque round, le personnage peut pivoter sur lui-m�me pour �tudier une nouvelle zone. Le sort fonctionne � travers les barri�res si celles-ci ne sont pas trop �paisses : il est bloqu� par 30 cm de pierre, 2,5 cm de m�tal, une mince feuille de plomb ou 90 cm de bois ou de terre."};
spells["Identification"]={"category":"friendly","level":"1","name":"Identification","playerClass":"Magicien","portee":"18 m/12 cases","duree":"3 rounds/niveau","description":"Cibles �manation en c�ne<br/><br/>Jet de sauvegarde aucun ; R�sistance � la magie non<br/><br/>Ce sort fonctionne comme d�tection de la magie mais il offre un bonus d�alt�ration de +10 aux tests d�Art de la magie destin�s � d�couvrir les propri�t�s et les mots de commande des objets magiques en possession du personnage. <br/><br/>Identification ne fonctionne pas sur les artefacts."};